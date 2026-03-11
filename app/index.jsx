import ActivityRing from "@/components/ActivityRing";
import {
  Clock,
  Flame,
  Lock,
  Music,
  Notebook,
  Target,
  Timer,
  UserRound,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Index() {
  const [user, setUser] = useState("Akshit");
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // focus progress
  const [totalFocusHours, setTotalFocusHours] = useState(10);
  const [totalPomodoros, setTotalPomodoros] = useState(4);

  const goalExists = true;

  // set goal button
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Greeting */}
      <View className="flex-row items-center justify-between border-b border-neutral-100 bg-white px-5 pb-4 pt-3 shadow-xl">
        <View className="flex-row items-center gap-3">
          <View className="h-11 w-11 items-center justify-center rounded-2xl border border-blue-200 bg-blue-100">
            <UserRound size={24} color="#262626" />
          </View>

          <View>
            <Text
              className="text-xl text-neutral-800"
              style={{ fontFamily: "Andika_400Regular" }}
            >
              Hello, {user}
            </Text>
            <Text
              className="mt-0.5 text-sm text-neutral-500"
              style={{ fontFamily: "Andika_400Regular" }}
            >
              {formattedDate}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center rounded-2xl border border-orange-200 bg-orange-100 px-3 py-1.5">
          <Flame size={20} color="#f97316" fill="#f97316" />
          <Text
            className="ml-1 font-semibold text-orange-600"
            style={{ fontFamily: "Andika_400Regular" }}
          >
            12 Day Streak
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        className="bg-blue-50 px-5"
      >
        {/* Focus Progress Card */}
        <View className="mt-5 rounded-2xl border border-neutral-100 bg-white p-4 shadow-xl">
          <Text
            className="mb-3 text-lg font-semibold text-neutral-800"
            style={{ fontFamily: "Andika_400Regular" }}
          >
            Focus Progress
          </Text>

          <View className="flex-row justify-between">
            <View className="flex-row items-center gap-3">
              <Clock size={26} color="#3b82f6" />

              <View>
                <Text
                  className="text-lg font-bold text-neutral-800"
                  style={{ fontFamily: "Andika_400Regular" }}
                >
                  {totalFocusHours} hrs
                </Text>
                <Text
                  className="text-sm text-neutral-500"
                  style={{ fontFamily: "Andika_400Regular" }}
                >
                  Total Focus Time
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3">
              <Timer size={26} color="#3b82f6" />

              <View>
                <Text
                  className="text-lg font-bold text-neutral-800"
                  style={{ fontFamily: "Andika_400Regular" }}
                >
                  {totalPomodoros} sessions
                </Text>
                <Text
                  className="text-sm text-neutral-500"
                  style={{ fontFamily: "Andika_400Regular" }}
                >
                  Pomodoros Completed
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Goal Indicator Card */}
        <View className="mt-5 rounded-2xl border border-neutral-100 bg-white p-4 shadow-xl">
          {/* Header */}
          <View className="mb-3 flex-row items-center gap-3">
            <Text
              className="text-lg font-semibold text-neutral-800"
              style={{ fontFamily: "Andika_400Regular" }}
            >
              Daily Goal
            </Text>

            <Target size={24} color="#3b82f6" />
          </View>

          {goalExists ? (
            <>
              <ActivityRing />
            </>
          ) : (
            <>
              <Text
                className="mb-3 text-lg font-semibold text-neutral-500"
                style={{ fontFamily: "Andika_400Regular" }}
              >
                Set a goal to start tracking progress.
              </Text>

              <AnimatedPressable
                onPressIn={() => {
                  scale.value = withSpring(0.95);
                }}
                onPressOut={() => {
                  scale.value = withSpring(1);
                }}
                style={animatedStyle}
                className="items-center rounded-2xl border border-neutral-200 bg-blue-500 px-6 py-3 shadow-md"
              >
                <Text className="text-base font-semibold text-white">
                  Set Goal
                </Text>
              </AnimatedPressable>
            </>
          )}
        </View>

        {/* Quick Actions */}
        <Text
          className="my-5 text-lg font-semibold text-neutral-800"
          style={{ fontFamily: "Andika_400Regular" }}
        >
          Quick Actions
        </Text>

        {/* Lock Phone */}
        <ActionCard
          icon={<Lock size={25} color="#3b82f6" />}
          title="Lock Phone"
          subtitle="Stay here until your focus session ends"
        />

        {/* // Start Pomodoro
        // <ActionCard
        //   icon={<Timer size={25} color="#3b82f6" />}
        //   title="Start Pomodoro"
        //   subtitle="Begin focus session"
        // /> */}

        {/* Notes */}
        <ActionCard
          icon={<Notebook size={25} color="#3b82f6" />}
          title="Notes"
          subtitle="Capture quick thoughts"
        />

        {/* Music */}
        <ActionCard
          icon={<Music size={25} color="#3b82f6" />}
          title="Background Music"
          subtitle="Play lofi / ambient"
        />

        {/* Goals */}
        <ActionCard
          icon={<Target size={25} color="#3b82f6" />}
          title="Set Goals"
          subtitle="Define daily focus goals"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionCard({ icon, title, subtitle }) {
  return (
    <Pressable className="mb-5 flex-row items-center rounded-2xl border border-neutral-100 bg-white p-4 shadow-xl">
      <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl border border-blue-200 bg-blue-100">
        {icon}
      </View>

      <View className="flex-1">
        <Text
          className="text-lg font-semibold text-neutral-800"
          style={{ fontFamily: "Andika_400Regular" }}
        >
          {title}
        </Text>

        <Text
          className="mt-0.5 text-sm text-neutral-500"
          style={{ fontFamily: "Andika_400Regular" }}
        >
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}
