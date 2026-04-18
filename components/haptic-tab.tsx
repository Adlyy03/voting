
import { Pressable, PressableProps, View } from "react-native";
import * as Haptics from "expo-haptics";

export function HapticTab(props: PressableProps) {
  return (
    <Pressable
      onPress={(e) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        props.onPress?.(e);
      }}
      {...props}
    />
  );
}
