import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function HeroPill({ text, icon: Icon, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={cn(
        "px-4 py-1 border-2 cursor-default flex items-center gap-2",
        color === "rose" &&
          "bg-rose-500/10 text-rose-500 border-rose-500/20 rounded-l-full border-r-0",
        color === "primary" && "bg-primary/10 text-primary border-primary/20",
        color === "emerald" &&
          "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 rounded-r-full border-l-0"
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span className="text-sm font-semibold">{text}</span>
    </motion.div>
  );
}
