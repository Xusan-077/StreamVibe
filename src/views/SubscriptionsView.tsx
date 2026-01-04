import HomeStart from "@/components/sections/home/HomeStart";
import SubscriptionsCompare from "@/components/sections/subscriptions/SubscriptionsCompare";
import SubscriptionsPlan from "@/components/sections/subscriptions/SubscriptionsPlan";

export default function SubscriptionsView() {
  return (
    <>
      <SubscriptionsPlan />
      <SubscriptionsCompare />
      <HomeStart />
    </>
  );
}
