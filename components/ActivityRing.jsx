import { LinearGradient as ExpoGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function ActivityRing({
  size = 220,
  strokeWidth = 14,
  progress = 0.55,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnim = useSharedValue(0);
  const glowAnim = useSharedValue(1);

  useEffect(() => {
    progressAnim.value = withTiming(progress, {
      duration: 1800,
      easing: Easing.out(Easing.exp),
    });

    glowAnim.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1500 }),
        withTiming(1, { duration: 1500 }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference - circumference * progressAnim.value,
  }));

  const glowStyle = {
    transform: [{ scale: glowAnim }],
  };

  return (
    <View className="mb-4 mt-3 items-center justify-center">
      {/* Breathing Glow */}
      <Animated.View
        style={glowStyle}
        className="absolute h-60 w-60 rounded-full bg-blue-200/30 blur-3xl"
      />

      {/* Glass Card */}
      <ExpoGradient
        colors={["rgba(255,255,255,0.4)", "rgba(255,255,255,0.05)"]}
        className="absolute h-48 w-48 items-center justify-center rounded-full"
      />

      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#818cf8" />
            <Stop offset="100%" stopColor="#6366f1" />
          </LinearGradient>
        </Defs>

        {/* Background Ring */}
        <Circle
          stroke="#e5e7eb"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Gradient Progress Ring */}
        <AnimatedCircle
          animatedProps={animatedProps}
          stroke="url(#grad)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Center Content */}
      <View className="absolute items-center">
        <Text className="text-3xl font-bold text-neutral-800">55%</Text>

        <Text className="text-xs tracking-widest text-neutral-500">
          COMPLETED
        </Text>

        <View className="my-2 h-px w-16 bg-neutral-200" />

        <Text className="text-xl font-semibold text-neutral-800">1h 40m</Text>

        <Text className="text-sm text-neutral-500">of 3h goal</Text>
      </View>
    </View>
  );
}
