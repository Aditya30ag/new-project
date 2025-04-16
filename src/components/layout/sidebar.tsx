"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  Briefcase,
  Building2,
  CalendarClock,
  FileText,
  X
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
};

export default function Sidebar({ isOpen, onClose, userRole }: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden", "md:overflow-auto");
    } else {
      document.body.classList.remove("overflow-hidden", "md:overflow-auto");
    }
    return () => {
      document.body.classList.remove("overflow-hidden", "md:overflow-auto");
    };
  }, [isOpen]);

  const superAdminLinks = [
    {
      name: "Dashboard",
      href: "/super-admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Universities",
      href: "/super-admin/universities",
      icon: Building,
    },
    {
      name: "Administrators",
      href: "/super-admin/administrators",
      icon: Users,
    },
    {
      name: "Reports",
      href: "/super-admin/reports",
      icon: FileText,
    },
    {
      name: "Settings",
      href: "/super-admin/settings",
      icon: Settings,
    },
  ];

  const universityAdminLinks = [
    {
      name: "Dashboard",
      href: "/university-admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Jobs",
      href: "/university-admin/jobs",
      icon: Briefcase,
    },
    {
      name: "Companies",
      href: "/university-admin/companies",
      icon: Building2,
    },
    {
      name: "Students",
      href: "/university-admin/students",
      icon: GraduationCap,
    },
    {
      name: "Interviews",
      href: "/university-admin/interviews",
      icon: CalendarClock,
    },
    {
      name: "Sub-Users",
      href: "/university-admin/sub-users",
      icon: Users,
    },
    {
      name: "Reports",
      href: "/university-admin/reports",
      icon: FileText,
    },
    {
      name: "Settings",
      href: "/university-admin/settings",
      icon: Settings,
    },
  ];

  const subUserLinks = [
    {
      name: "Dashboard",
      href: "/sub-user/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Assigned Jobs",
      href: "/sub-user/jobs",
      icon: Briefcase,
    },
    {
      name: "Interviews",
      href: "/sub-user/interviews",
      icon: CalendarClock,
    },
    {
      name: "Settings",
      href: "/sub-user/settings",
      icon: Settings,
    },
  ];

  const links = 
    userRole === "SUPER_ADMIN"
      ? superAdminLinks
      : userRole === "UNIVERSITY_ADMIN"
      ? universityAdminLinks
      : subUserLinks;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed top-0 left-0 h-full z-50 bg-card w-64 border-r border-border shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link
            href="/"
            className="flex items-center space-x-2 font-semibold text-primary"
          >
            <GraduationCap className="h-6 w-6" />
            <span className="text-lg">PlacementSystem</span>
          </Link>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-accent md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="py-4 flex flex-col h-[calc(100%-4rem)] justify-between">
          <nav className="space-y-1 px-2">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === link.href || pathname.startsWith(`${link.href}/`)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <link.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="px-2 mt-auto">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

