import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function HeroPill({ text, icon: Icon, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={cn(
        "px-4 py-1 cursor-default flex items-center gap-2",
        color === "rose" && "bg-white text-rose-500 rounded-l-full",
        color === "primary" && "bg-white text-primary border-x-2",
        color === "emerald" && "bg-white text-emerald-500 rounded-r-full"
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span className="text-sm font-semibold">{text}</span>
    </motion.div>
  );
}
