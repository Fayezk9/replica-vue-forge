/**
 * Course Type Definitions
 */

export interface CourseInfo {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  startDate?: string;
  schedule?: string;
}

export interface ExamInfo {
  id: string;
  name: string;
  level: string;
  price: number;
  description: string;
  duration?: string;
}

export type CourseLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type CertificateDelivery = 'standard' | 'express';
