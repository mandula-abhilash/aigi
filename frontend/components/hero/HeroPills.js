import { Heart, Sparkles, Gift } from "lucide-react";
import HeroPill from "./HeroPill";

export default function HeroPills() {
  return (
    <div className="inline-flex text-sm font-semibold shadow-lg rounded-full hover:scale-105 duration-500">
      <HeroPill text="Perfect" icon={Heart} color="rose" delay={0.2} />
      <HeroPill text="Thoughtful" icon={Sparkles} color="primary" delay={0.3} />
      <HeroPill text="Memorable" icon={Gift} color="emerald" delay={0.4} />
    </div>
  );
}
