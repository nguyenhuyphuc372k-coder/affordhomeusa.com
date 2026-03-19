export default function AdBanner({
  slot,
  className = "",
}: {
  slot: "leaderboard" | "sidebar" | "in-article" | "footer-sticky";
  className?: string;
}) {
  void slot;
  void className;
  return null;
}
