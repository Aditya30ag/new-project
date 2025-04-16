import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "./db";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    return user;
  } catch (error) {
    return null;
  }
}

export function formatDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

export function getInitials(name: string) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

export function truncate(str: string, length: number) {
  if (!str) return "";
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function generatePassword(length = 10) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getStatusColor(status: string) {
  const statusMap: Record<string, string> = {
    // Job status
    DRAFT: "bg-gray-200 text-gray-800",
    OPEN: "bg-green-100 text-green-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-purple-100 text-purple-800",
    CANCELLED: "bg-red-100 text-red-800",
    
    // Application status
    APPLIED: "bg-blue-100 text-blue-800",
    SHORTLISTED: "bg-yellow-100 text-yellow-800",
    INTERVIEWING: "bg-purple-100 text-purple-800",
    SELECTED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    OFFER_ACCEPTED: "bg-green-100 text-green-800",
    OFFER_DECLINED: "bg-orange-100 text-orange-800",
    JOINED: "bg-indigo-100 text-indigo-800",
    
    // Interview status
    SCHEDULED: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-blue-100 text-blue-800",
    PASSED: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
    
    // Default
    DEFAULT: "bg-gray-100 text-gray-800",
  };
  
  return statusMap[status] || statusMap.DEFAULT;
}

export async function createActivityLog(userId: string, action: string, details?: any) {
  try {
    await db.activityLog.create({
      data: {
        userId,
        action,
        details: details ? details : {},
      },
    });
  } catch (error) {
    console.error("Error creating activity log:", error);
  }
}

export async function createNotification(userId: string, title: string, message: string, type?: string, link?: string) {
  try {
    await db.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        link,
      },
    });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
}

export function convertToCSV(objArray: any[]) {
  if (objArray.length === 0) return '';
  const fields = Object.keys(objArray[0]);
  
  // Generate header
  let csv = fields.join(',') + '\n';
  
  // Generate rows
  objArray.forEach((obj) => {
    const row = fields.map((field) => {
      let value = obj[field];
      
      // Handle null and undefined
      if (value === null || value === undefined) return '';
      
      // Handle nested objects
      if (typeof value === 'object' && !(value instanceof Date)) {
        value = JSON.stringify(value);
      }
      
      // Handle dates
      if (value instanceof Date) {
        value = value.toISOString();
      }
      
      // Escape commas and quotes
      value = String(value).replace(/"/g, '""');
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        value = `"${value}"`;
      }
      
      return value;
    });
    
    csv += row.join(',') + '\n';
  });
  
  return csv;
}


