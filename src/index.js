/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import { Animated, Easing, PanResponder, StyleSheet, View, ViewPropTypes } from 'react-native';
import { PropTypes } from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */

function noop() { }

export default class Swipeable extends PureComponent {

  static propTypes = {
    // elements
    children: PropTypes.any,
    leftContent: PropTypes.any,
    rightContent: PropTypes.any,
    leftButtons: PropTypes.array,
    rightButtons: PropTypes.array,

    // left action lifecycle
    onLeftActionActivate: PropTypes.func,
    onLeftActionActivate2: PropTypes.func,
    onLeftActionDeactivate: PropTypes.func,
    onLeftActionDeactivate2: PropTypes.func,
    onLeftActionRelease: PropTypes.func,
    onLeftActionRelease2: PropTypes.func,
    onLeftActionComplete: PropTypes.func,
    onLeftActionComplete2: PropTypes.func,
    leftActionActivationDistance: PropTypes.number,
    leftActionActivationDistance2: PropTypes.number,
    leftActionReleaseAnimationFn: PropTypes.func,
    leftActionReleaseAnimationFn2: PropTypes.func,
    leftActionReleaseAnimationConfig: PropTypes.object,
    leftActionReleaseAnimationConfig2: PropTypes.object,

    // right action lifecycle
    onRightActionActivate: PropTypes.func,
    onRightActionActivate2: PropTypes.func,
    onRightActionDeactivate: PropTypes.func,
    onRightActionDeactivate2: PropTypes.func,
    onRightActionRelease: PropTypes.func,
    onRightActionRelease2: PropTypes.func,
    onRightActionComplete: PropTypes.func,
    onRightActionComplete2: PropTypes.func,
    rightActionActivationDistance: PropTypes.number,
    rightActionActivationDistance2: PropTypes.number,
    rightActionReleaseAnimationFn: PropTypes.func,
    rightActionReleaseAnimationFn2: PropTypes.func,
    rightActionReleaseAnimationConfig: PropTypes.object,
    rightActionReleaseAnimationConfig2: PropTypes.object,

    // left buttons lifecycle
    onLeftButtonsActivate: PropTypes.func,
    onLeftButtonsDeactivate: PropTypes.func,
    onLeftButtonsOpenRelease: PropTypes.func,
    onLeftButtonsOpenComplete: PropTypes.func,
    onLeftButtonsCloseRelease: PropTypes.func,
    onLeftButtonsCloseComplete: PropTypes.func,
    leftButtonWidth: PropTypes.number,
    leftButtonsActivationDistance: PropTypes.number,
    leftButtonsOpenReleaseAnimationFn: PropTypes.func,
    leftButtonsOpenReleaseAnimationConfig: PropTypes.object,
    leftButtonsCloseReleaseAnimationFn: PropTypes.func,
    leftButtonsCloseReleaseAnimationConfig: PropTypes.object,

    // right buttons lifecycle
    onRightButtonsActivate: PropTypes.func,
    onRightButtonsDeactivate: PropTypes.func,
    onRightButtonsOpenRelease: PropTypes.func,
    onRightButtonsOpenComplete: PropTypes.func,
    onRightButtonsCloseRelease: PropTypes.func,
    onRightButtonsCloseComplete: PropTypes.func,
    rightButtonWidth: PropTypes.number,
    rightButtonsActivationDistance: PropTypes.number,
    rightButtonsOpenReleaseAnimationFn: PropTypes.func,
    rightButtonsOpenReleaseAnimationConfig: PropTypes.object,
    rightButtonsCloseReleaseAnimationFn: PropTypes.func,
    rightButtonsCloseReleaseAnimationConfig: PropTypes.object,

    // base swipe lifecycle
    onSwipeStart: PropTypes.func,
    onSwipeMove: PropTypes.func,
    onSwipeRelease: PropTypes.func,
    onSwipeComplete: PropTypes.func,
    swipeReleaseAnimationFn: PropTypes.func,
    swipeReleaseAnimationConfig: PropTypes.object,

    // misc
    onRef: PropTypes.func,
    onPanAnimatedValueRef: PropTypes.func,
    swipeStartMinDistance: PropTypes.number,

    // styles
    style: ViewPropTypes.style,
    leftContainerStyle: ViewPropTypes.style,
    leftButtonContainerStyle: ViewPropTypes.style,
    rightContainerStyle: ViewPropTypes.style,
    rightButtonContainerStyle: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style
  };

  static defaultProps = {
    leftContent: null,
    rightContent: null,
    leftButtons: null,
    rightButtons: null,

    // left action lifecycle
    onLeftActionActivate: noop,
    onLeftActionActivate2: noop,
    onLeftActionDeactivate: noop,
    onLeftActionDeactivate2: noop,
    onLeftActionRelease: noop,
    onLeftActionRelease2: noop,
    onLeftActionComplete: noop,
    onLeftActionComplete2: noop,
    leftActionActivationDistance: 125,
    leftActionActivationDistance2: 200,
    leftActionReleaseAnimationFn: null,
    leftActionReleaseAnimationFn2: null,
    leftActionReleaseAnimationConfig: null,
    leftActionReleaseAnimationConfig2: null,

    // right action lifecycle
    onRightActionActivate: noop,
    onRightActionActivate2: noop,
    onRightActionDeactivate: noop,
    onRightActionDeactivate2: noop,
    onRightActionRelease: noop,
    onRightActionRelease2: noop,
    onRightActionComplete: noop,
    onRightActionComplete2: noop,
    rightActionActivationDistance: 125,
    rightActionActivationDistance2: 200,
    rightActionReleaseAnimationFn: null,
    rightActionReleaseAnimationFn2: null,
    rightActionReleaseAnimationConfig: null,
    rightActionReleaseAnimationConfig2: null,

    // left buttons lifecycle
    onLeftButtonsActivate: noop,
    onLeftButtonsDeactivate: noop,
    onLeftButtonsOpenRelease: noop,
    onLeftButtonsOpenComplete: noop,
    onLeftButtonsCloseRelease: noop,
    onLeftButtonsCloseComplete: noop,
    leftButtonWidth: 75,
    leftButtonsActivationDistance: 75,
    leftButtonsOpenReleaseAnimationFn: null,
    leftButtonsOpenReleaseAnimationConfig: null,
    leftButtonsCloseReleaseAnimationFn: null,
    leftButtonsCloseReleaseAnimationConfig: null,

    // right buttons lifecycle
    onRightButtonsActivate: noop,
    onRightButtonsDeactivate: noop,
    onRightButtonsOpenRelease: noop,
    onRightButtonsOpenComplete: noop,
    onRightButtonsCloseRelease: noop,
    onRightButtonsCloseComplete: noop,
    rightButtonWidth: 75,
    rightButtonsActivationDistance: 75,
    rightButtonsOpenReleaseAnimationFn: null,
    rightButtonsOpenReleaseAnimationConfig: null,
    rightButtonsCloseReleaseAnimationFn: null,
    rightButtonsCloseReleaseAnimationConfig: null,

    // base swipe lifecycle
    onSwipeStart: noop,
    onSwipeMove: noop,
    onSwipeRelease: noop,
    onSwipeComplete: noop,
    swipeReleaseAnimationFn: Animated.timing,
    swipeReleaseAnimationConfig: {
      toValue: { x: 0, y: 0 },
      duration: 250,
      easing: Easing.elastic(0.5)
    },

    // misc
    onRef: noop,
    onPanAnimatedValueRef: noop,
    swipeStartMinDistance: 15
  };

  state = {
    pan: new Animated.ValueXY(),
    width: 0,
    lastOffset: { x: 0, y: 0 },
    leftActionActivated: false,
    leftActionActivated2: false,
    leftButtonsActivated: false,
    leftButtonsOpen: false,
    rightActionActivated: false,
    rightActionActivated2: false,
    rightButtonsActivated: false,
    rightButtonsActivated2: false,
    rightButtonsOpen: false
  };

  componentWillMount() {
    const { onPanAnimatedValueRef, onRef } = this.props;

    onRef(this);
    onPanAnimatedValueRef(this.state.pan);
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  recenter = (
    animationFn = this.props.swipeReleaseAnimationFn,
    animationConfig = this.props.swipeReleaseAnimationConfig,
    onDone
  ) => {
    const { pan } = this.state;

    this.setState({
      lastOffset: { x: 0, y: 0 },
      leftActionActivated: false,
      leftActionActivated2: false,
      leftButtonsActivated: false,
      leftButtonsOpen: false,
      rightActionActivated: false,
      rightActionActivated2: false,
      rightButtonsActivated: false,
      rightButtonsOpen: false
    });

    pan.flattenOffset();

    animationFn(pan, animationConfig).start(onDone);
  };

  _unmounted = false;

  _handlePan = Animated.event([null, {
    dx: this.state.pan.x,
    dy: this.state.pan.y
  }]);

  _handleMoveShouldSetPanResponder = (event, gestureState) => (
    Math.abs(gestureState.dx) > this.props.swipeStartMinDistance
  );

  _handlePanResponderStart = (event, gestureState) => {
    const { lastOffset, pan } = this.state;

    pan.setOffset(lastOffset);
    this.props.onSwipeStart(event, gestureState, this);
  };

  _handlePanResponderMove = (event, gestureState) => {
    const {
      leftActionActivationDistance,
      leftActionActivationDistance2,
      leftButtonsActivationDistance,
      onLeftActionActivate,
      onLeftActionActivate2,
      onLeftActionDeactivate,
      onLeftActionDeactivate2,
      onLeftButtonsActivate,
      onLeftButtonsDeactivate,
      rightActionActivationDistance,
      rightActionActivationDistance2,
      rightButtonsActivationDistance,
      onRightActionActivate,
      onRightActionActivate2,
      onRightActionDeactivate,
      onRightActionDeactivate2,
      onRightButtonsActivate,
      onRightButtonsDeactivate,
      onSwipeMove
    } = this.props;
    const {
      lastOffset,
      leftActionActivated,
      leftActionActivated2,
      leftButtonsActivated,
      rightActionActivated,
      rightActionActivated2,
      rightButtonsActivated
    } = this.state;
    const { dx, vx } = gestureState;
    const x = dx + lastOffset.x;
    const canSwipeRight = this._canSwipeRight();
    const canSwipeLeft = this._canSwipeLeft();
    const hasLeftButtons = this._hasLeftButtons();
    const hasRightButtons = this._hasRightButtons();
    const isSwipingLeft = vx < 0;
    const isSwipingRight = vx > 0;
    let nextLeftActionActivated = leftActionActivated;
    let nextLeftActionActivated2 = leftActionActivated2;
    let nextLeftButtonsActivated = leftButtonsActivated;
    let nextRightActionActivated = rightActionActivated;
    let nextRightActionActivated2 = rightActionActivated2;
    let nextRightButtonsActivated = rightButtonsActivated;

    this._handlePan(event, gestureState);
    onSwipeMove(event, gestureState, this);

    if (!leftActionActivated2 && canSwipeRight && x >= leftActionActivationDistance2) {
      nextLeftActionActivated2 = true;
      onLeftActionActivate2(event, gestureState, this);
    }

    if (!leftActionActivated && canSwipeRight && x >= leftActionActivationDistance && x < leftActionActivationDistance2) {
      nextLeftActionActivated = true;
      onLeftActionActivate(event, gestureState, this);
    }

    if (leftActionActivated2 && canSwipeRight && x < leftActionActivationDistance2) {
      nextLeftActionActivated2 = false;
      onLeftActionDeactivate2(event, gestureState, this);
    }

    if (leftActionActivated && canSwipeRight && x < leftActionActivationDistance) {
      nextLeftActionActivated = false;
      onLeftActionDeactivate(event, gestureState, this);
    }

    if (!rightActionActivated2 && canSwipeLeft && x <= -rightActionActivationDistance2) {
      nextRightActionActivated2 = true;
      onRightActionActivate2(event, gestureState, this);
    }

    if (!rightActionActivated && canSwipeLeft && x <= -rightActionActivationDistance && x > -rightActionActivationDistance2) {
      nextRightActionActivated = true;
      onRightActionActivate(event, gestureState, this);
    }

    if (rightActionActivated2 && canSwipeLeft && x > -rightActionActivationDistance2) {
      nextRightActionActivated2 = false;
      onRightActionDeactivate2(event, gestureState, this);
    }

    if (rightActionActivated && canSwipeLeft && x > -rightActionActivationDistance) {
      nextRightActionActivated = false;
      onRightActionDeactivate(event, gestureState, this);
    }

    if (!leftButtonsActivated && hasLeftButtons && !isSwipingLeft && x >= leftButtonsActivationDistance) {
      nextLeftButtonsActivated = true;
      onLeftButtonsActivate(event, gestureState, this);
    }

    if (leftButtonsActivated && hasLeftButtons && isSwipingLeft) {
      nextLeftButtonsActivated = false;
      onLeftButtonsDeactivate(event, gestureState, this);
    }

    if (!rightButtonsActivated && hasRightButtons && !isSwipingRight && x <= -rightButtonsActivationDistance) {
      nextRightButtonsActivated = true;
      onRightButtonsActivate(event, gestureState, this);
    }

    if (rightButtonsActivated && hasRightButtons && isSwipingRight) {
      nextRightButtonsActivated = false;
      onRightButtonsDeactivate(event, gestureState, this);
    }

    const needsUpdate =
      nextLeftActionActivated !== leftActionActivated ||
      nextLeftActionActivated2 !== leftActionActivated2 ||
      nextLeftButtonsActivated !== leftButtonsActivated ||
      nextRightActionActivated !== rightActionActivated ||
      nextRightActionActivated2 !== rightActionActivated2 ||
      nextRightButtonsActivated !== rightButtonsActivated;

    if (needsUpdate) {
      this.setState({
        leftActionActivated: nextLeftActionActivated,
        leftActionActivated2: nextLeftActionActivated2,
        leftButtonsActivated: nextLeftButtonsActivated,
        rightActionActivated: nextRightActionActivated,
        rightActionActivated2: nextRightActionActivated2,
        rightButtonsActivated: nextRightButtonsActivated
      });
    }
  };

  _handlePanResponderEnd = (event, gestureState) => {
    const {
      onLeftActionRelease,
      onLeftActionRelease2,
      onLeftActionDeactivate,
      onLeftActionDeactivate2,
      onLeftButtonsOpenRelease,
      onLeftButtonsCloseRelease,
      onRightActionRelease,
      onRightActionRelease2,
      onRightActionDeactivate,
      onRightActionDeactivate2,
      onRightButtonsOpenRelease,
      onRightButtonsCloseRelease,
      onSwipeRelease
    } = this.props;
    const {
      leftActionActivated,
      leftActionActivated2,
      leftButtonsOpen,
      leftButtonsActivated,
      rightActionActivated,
      rightActionActivated2,
      rightButtonsOpen,
      rightButtonsActivated,
      pan
    } = this.state;
    const animationFn = this._getReleaseAnimationFn();
    const animationConfig = this._getReleaseAnimationConfig();

    onSwipeRelease(event, gestureState, this);

    if (leftActionActivated) {
      onLeftActionRelease(event, gestureState, this);
    }

    if (leftActionActivated2) {
      onLeftActionRelease2(event, gestureState, this);
    }

    if (rightActionActivated) {
      onRightActionRelease(event, gestureState, this);
    }

    if (rightActionActivated2) {
      onRightActionRelease2(event, gestureState, this);
    }

    if (leftButtonsActivated && !leftButtonsOpen) {
      onLeftButtonsOpenRelease(event, gestureState, this);
    }

    if (!leftButtonsActivated && leftButtonsOpen) {
      onLeftButtonsCloseRelease(event, gestureState, this);
    }

    if (rightButtonsActivated && !rightButtonsOpen) {
      onRightButtonsOpenRelease(event, gestureState, this);
    }

    if (!rightButtonsActivated && rightButtonsOpen) {
      onRightButtonsCloseRelease(event, gestureState, this);
    }

    this.setState({
      lastOffset: { x: animationConfig.toValue.x, y: animationConfig.toValue.y },
      leftActionActivated: false,
      leftActionActivated2: false,
      rightActionActivated: false,
      rightActionActivated2: false,
      leftButtonsOpen: leftButtonsActivated,
      rightButtonsOpen: rightButtonsActivated
    });

    pan.flattenOffset();

    animationFn(pan, animationConfig).start(() => {
      if (this._unmounted) {
        return;
      }

      const {
        onLeftActionComplete,
        onLeftActionComplete2,
        onLeftButtonsOpenComplete,
        onLeftButtonsCloseComplete,
        onRightActionComplete,
        onRightActionComplete2,
        onRightButtonsOpenComplete,
        onRightButtonsCloseComplete,
        onSwipeComplete
      } = this.props;

      onSwipeComplete(event, gestureState, this);

      if (leftActionActivated2) {
        onLeftActionComplete2(event, gestureState, this);
        onLeftActionDeactivate2(event, gestureState, this);
      }

      if (!leftActionActivated2 && leftActionActivated) {
        onLeftActionComplete(event, gestureState, this);
        onLeftActionDeactivate(event, gestureState, this);
      }

      if (rightActionActivated2) {
        onRightActionComplete2(event, gestureState, this);
        onRightActionDeactivate2(event, gestureState, this);
      }

      if (!rightActionActivated2 && rightActionActivated) {
        onRightActionComplete(event, gestureState, this);
        onRightActionDeactivate(event, gestureState, this);
      }

      if (leftButtonsActivated && !leftButtonsOpen) {
        onLeftButtonsOpenComplete(event, gestureState, this);
      }

      if (!leftButtonsActivated && leftButtonsOpen) {
        onLeftButtonsCloseComplete(event, gestureState, this);
      }

      if (rightButtonsActivated && !rightButtonsOpen) {
        onRightButtonsOpenComplete(event, gestureState, this);
      }

      if (!rightButtonsActivated && rightButtonsOpen) {
        onRightButtonsCloseComplete(event, gestureState, this);
      }
    });
  };

  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
    onMoveShouldSetPanResponderCapture: this._handleMoveShouldSetPanResponder,
    onPanResponderGrant: this._handlePanResponderStart,
    onPanResponderMove: this._handlePanResponderMove,
    onPanResponderRelease: this._handlePanResponderEnd,
    onPanResponderTerminate: this._handlePanResponderEnd,
    onPanResponderTerminationRequest: this._handlePanResponderEnd
  });

  _handleLayout = ({ nativeEvent: { layout: { width } } }) => this.setState({ width });

  _canSwipeRight() {
    return this.props.leftContent || this._hasLeftButtons();
  }

  _canSwipeLeft() {
    return this.props.rightContent || this._hasRightButtons();
  }

  _hasLeftButtons() {
    const { leftButtons, leftContent } = this.props;

    return !leftContent && leftButtons && leftButtons.length;
  }

  _hasRightButtons() {
    const { rightButtons, rightContent } = this.props;

    return !rightContent && rightButtons && rightButtons.length;
  }

  _getReleaseAnimationFn() {
    const {
      leftActionReleaseAnimationFn,
      leftActionReleaseAnimationFn2,
      leftButtonsOpenReleaseAnimationFn,
      leftButtonsCloseReleaseAnimationFn,
      rightActionReleaseAnimationFn,
      rightActionReleaseAnimationFn2,
      rightButtonsOpenReleaseAnimationFn,
      rightButtonsCloseReleaseAnimationFn,
      swipeReleaseAnimationFn
    } = this.props;
    const {
      leftActionActivated,
      leftActionActivated2,
      leftButtonsActivated,
      leftButtonsOpen,
      rightActionActivated,
      rightActionActivated2,
      rightButtonsActivated,
      rightButtonsOpen
    } = this.state;

    if (leftActionActivated && leftActionReleaseAnimationFn) {
      return leftActionReleaseAnimationFn;
    }

    if (leftActionActivated2 && leftActionReleaseAnimationFn2) {
      return leftActionReleaseAnimationFn2;
    }

    if (rightActionActivated && rightActionReleaseAnimationFn) {
      return rightActionReleaseAnimationFn;
    }

    if (rightActionActivated2 && rightActionReleaseAnimationFn2) {
      return rightActionReleaseAnimationFn2;
    }

    if (leftButtonsActivated && leftButtonsOpenReleaseAnimationFn) {
      return leftButtonsOpenReleaseAnimationFn;
    }

    if (!leftButtonsActivated && leftButtonsOpen && leftButtonsCloseReleaseAnimationFn) {
      return leftButtonsCloseReleaseAnimationFn;
    }

    if (rightButtonsActivated && rightButtonsOpenReleaseAnimationFn) {
      return rightButtonsOpenReleaseAnimationFn;
    }

    if (!rightButtonsActivated && rightButtonsOpen && rightButtonsCloseReleaseAnimationFn) {
      return rightButtonsCloseReleaseAnimationFn;
    }

    return swipeReleaseAnimationFn;
  }

  _getReleaseAnimationConfig() {
    const {
      leftActionReleaseAnimationConfig,
      leftActionReleaseAnimationConfig2,
      leftButtons,
      leftButtonsOpenReleaseAnimationConfig,
      leftButtonsCloseReleaseAnimationConfig,
      leftButtonWidth,
      rightActionReleaseAnimationConfig,
      rightActionReleaseAnimationConfig2,
      rightButtons,
      rightButtonsOpenReleaseAnimationConfig,
      rightButtonsCloseReleaseAnimationConfig,
      rightButtonWidth,
      swipeReleaseAnimationConfig
    } = this.props;
    const {
      leftActionActivated,
      leftActionActivated2,
      leftButtonsActivated,
      leftButtonsOpen,
      rightActionActivated,
      rightActionActivated2,
      rightButtonsActivated,
      rightButtonsOpen
    } = this.state;

    if (leftActionActivated && leftActionReleaseAnimationConfig) {
      return leftActionReleaseAnimationConfig;
    }

    if (leftActionActivated2 && leftActionReleaseAnimationConfig2) {
      return leftActionReleaseAnimationConfig2;
    }

    if (rightActionActivated && rightActionReleaseAnimationConfig) {
      return rightActionReleaseAnimationConfig;
    }

    if (rightActionActivated2 && rightActionReleaseAnimationConfig2) {
      return rightActionReleaseAnimationConfig2;
    }

    if (leftButtonsActivated) {
      return {
        ...swipeReleaseAnimationConfig,
        toValue: {
          x: leftButtons.length * leftButtonWidth,
          y: 0
        },
        ...leftButtonsOpenReleaseAnimationConfig
      };
    }

    if (rightButtonsActivated) {
      return {
        ...swipeReleaseAnimationConfig,
        toValue: {
          x: rightButtons.length * rightButtonWidth * -1,
          y: 0
        },
        ...rightButtonsOpenReleaseAnimationConfig
      };
    }

    if (!leftButtonsActivated && leftButtonsOpen && leftButtonsCloseReleaseAnimationConfig) {
      return leftButtonsCloseReleaseAnimationConfig;
    }

    if (!rightButtonsActivated && rightButtonsOpen && rightButtonsCloseReleaseAnimationConfig) {
      return rightButtonsCloseReleaseAnimationConfig;
    }

    return swipeReleaseAnimationConfig;
  }

  _renderButtons(buttons, isLeftButtons) {
    const { leftButtonContainerStyle, rightButtonContainerStyle } = this.props;
    const { pan, width } = this.state;
    const canSwipeLeft = this._canSwipeLeft();
    const canSwipeRight = this._canSwipeRight();
    const count = buttons.length;
    const leftEnd = canSwipeLeft ? -width : 0;
    const rightEnd = canSwipeRight ? width : 0;
    const inputRange = isLeftButtons ? [0, rightEnd] : [leftEnd, 0];

    return buttons.map((buttonContent, index) => {
      const outputMultiplier = -index / count;
      const outputRange = isLeftButtons ? [0, rightEnd * outputMultiplier] : [leftEnd * outputMultiplier, 0];
      const transform = [{
        translateX: pan.x.interpolate({
          inputRange,
          outputRange,
          extrapolate: 'clamp'
        })
      }];
      const buttonStyle = [
        StyleSheet.absoluteFill,
        { width, transform },
        isLeftButtons ? leftButtonContainerStyle : rightButtonContainerStyle
      ];

      return (
        <Animated.View key={index} style={buttonStyle}>
          {buttonContent}
        </Animated.View>
      );
    });
  }

  render() {
    const {
      children,
      contentContainerStyle,
      leftButtons,
      leftContainerStyle,
      leftContent,
      rightButtons,
      rightContainerStyle,
      rightContent,
      style,
      ...props
    } = this.props;
    const { pan, width } = this.state;
    const canSwipeLeft = this._canSwipeLeft();
    const canSwipeRight = this._canSwipeRight();
    const transform = [{
      translateX: pan.x.interpolate({
        inputRange: [canSwipeLeft ? -width : 0, canSwipeRight ? width : 0],
        outputRange: [
          canSwipeLeft ? -width + StyleSheet.hairlineWidth : 0,
          canSwipeRight ? width - StyleSheet.hairlineWidth : 0
        ],
        extrapolate: 'clamp'
      })
    }];

    return (
      <View onLayout={this._handleLayout} style={[styles.container, style]} {...this._panResponder.panHandlers} {...props}>
        {canSwipeRight && (
          <Animated.View style={[{ transform, marginLeft: -width, width }, leftContainerStyle]}>
            {leftContent || this._renderButtons(leftButtons, true)}
          </Animated.View>
        )}
        <Animated.View style={[{ transform }, styles.content, contentContainerStyle]}>{children}</Animated.View>
        {canSwipeLeft && (
          <Animated.View style={[{ transform, marginRight: -width, width }, rightContainerStyle]}>
            {rightContent || this._renderButtons(rightButtons, false)}
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  content: {
    flex: 1
  }
});
