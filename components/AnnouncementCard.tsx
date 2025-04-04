'use client';

import { motion } from "framer-motion";
import { 
  MapPin, 
  ExternalLink, 
  Clock,
  AlertTriangle,
  Building2,
  PartyPopper,
  Sparkles,
  FileText
} from 'lucide-react';
import { Announcement } from "@/types/announcement";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { formatDate } from '@/lib/dateUtils';

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const typeIcons = {
    urgent: AlertTriangle,
    facility: Building2,
    event: PartyPopper,
    opportunity: Sparkles,
    administrative: FileText,
  };

  const typeStyles = {
    urgent: {
      gradient: "bg-gradient-to-br from-red-50 via-red-100 to-orange-50",
      iconGradient: "from-red-500 to-orange-500",
      textGradient: "from-red-600 to-orange-600",
      cardBg: "bg-red-50",
      dateBg: "bg-red-600",
    },
    facility: {
      gradient: "bg-gradient-to-br from-blue-50 via-blue-100 to-sky-50",
      iconGradient: "from-blue-500 to-sky-500",
      textGradient: "from-blue-600 to-sky-600",
      cardBg: "bg-blue-50",
      dateBg: "bg-blue-600",
    },
    event: {
      gradient: "bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-50",
      iconGradient: "from-yellow-500 to-amber-500",
      textGradient: "from-yellow-600 to-amber-600",
      cardBg: "bg-yellow-50",
      dateBg: "bg-amber-600",
    },
    opportunity: {
      gradient: "bg-gradient-to-br from-purple-50 via-purple-100 to-fuchsia-50",
      iconGradient: "from-purple-500 to-fuchsia-500",
      textGradient: "from-purple-600 to-fuchsia-600",
      cardBg: "bg-purple-50",
      dateBg: "bg-purple-600",
    },
    administrative: {
      gradient: "bg-gradient-to-br from-gray-50 via-gray-100 to-slate-50",
      iconGradient: "from-gray-500 to-slate-500",
      textGradient: "from-gray-600 to-slate-600",
      cardBg: "bg-gray-50",
      dateBg: "bg-slate-700",
    },
  };

  const IconComponent = typeIcons[announcement.type];
  const styles = typeStyles[announcement.type];

  return (
    <motion.div
      className={cn(
        "rounded-xl border shadow-sm overflow-hidden relative min-h-[24rem]",
        styles.gradient
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Large Background Icon */}
      <div className="absolute -right-8 -bottom-8 opacity-[0.07]">
        <IconComponent className="w-48 h-48" />
      </div>

      <motion.div 
        className={cn(
          "relative p-6 rounded-xl overflow-hidden",
          styles.cardBg,
          "shadow-lg hover:shadow-xl transition-shadow",
          "flex flex-col h-full"
        )}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <BackgroundPattern 
            type={announcement.type}
            subType={announcement.subType}
            width={400}
            height={400}
          />
        </div>

        {/* Date - Absolute positioned with category color */}
        <motion.div 
          className={cn(
            "absolute top-4 right-4 z-10",
            styles.dateBg,
            "px-4 py-2 rounded-xl",
            "text-white font-semibold tracking-wide"
          )}
        >
          {formatDate(announcement.date)}
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          {/* Type Icon and Label */}
          <div className="flex items-center gap-2 mb-4">
            <IconComponent className="w-5 h-5" />
            <span className="text-sm font-medium">{announcement.type}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-4">
            {announcement.title}
          </h3>

          {/* Time and Location */}
          <div className="space-y-2 text-gray-600 mb-4">
            {announcement.time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{announcement.time}</span>
              </div>
            )}
            {announcement.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{announcement.location}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 line-clamp-3 mb-4 flex-grow">
            {announcement.description}
          </p>

          {/* Link */}
          {announcement.primary_link && (
            <a 
              href={announcement.primary_link}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mt-auto group"
            >
              Learn More
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
} 