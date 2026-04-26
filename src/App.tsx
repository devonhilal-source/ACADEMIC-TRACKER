/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  GraduationCap, 
  Sliders, 
  Search, 
  Settings, 
  Plus, 
  TrendingUp, 
  ChevronRight, 
  ArrowLeft, 
  BarChart3, 
  AlertCircle, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Bell,
  Trash2,
  Save,
  LineChart,
  FireExtinguisher as Fire
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn } from './lib/utils';

// --- Types & Dummy Data ---

type Tab = 'dashboard' | 'semesters' | 'courses' | 'planner' | 'analytics' | 'settings' | 'course-detail';

const gpaTrendData = [
  { name: 'SEM 1', gpa: 3.4 },
  { name: 'SEM 2', gpa: 3.1 },
  { name: 'SEM 3', gpa: 3.7 },
  { name: 'SEM 4', gpa: 3.82 },
];

const scoreDistribution = [
  { name: 'Week 1', quizzes: 85, exams: 70, projects: 92 },
  { name: 'Week 2', quizzes: 65, exams: 80, projects: 75 },
  { name: 'Week 3', quizzes: 90, exams: 60, projects: 85 },
  { name: 'Week 4', quizzes: 75, exams: 95, projects: 88 },
];

// --- Components ---

const NavItem = ({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center px-4 py-1.5 transition-all duration-200 ease-out active:scale-90 rounded-2xl",
      active ? "bg-secondary-container text-secondary" : "text-slate-400 hover:text-secondary"
    )}
  >
    <Icon className={cn("w-6 h-6", active && "fill-current")} />
    <span className="font-sans text-[11px] font-semibold mt-1 uppercase tracking-wider">{label}</span>
  </button>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-white rounded-3xl border border-outline shadow-[0_4px_24px_rgba(90,90,64,0.03)] overflow-hidden", className)}>
    {children}
  </div>
);

// --- Pages ---

const Dashboard = ({ onNavigate }: { onNavigate: (t: Tab) => void }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* GPA Hero */}
      <Card className="md:col-span-12 p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 border-none bg-white">
        <div className="z-10 text-center md:text-left">
          <p className="label-caps text-secondary mb-1">Current GPA</p>
          <h2 className="font-h1 text-primary">3.82</h2>
          <p className="text-secondary/60 text-sm mt-1 italic font-serif">Target: 4.00</p>
        </div>
        
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="56" fill="transparent" stroke="var(--color-surface-container)" strokeWidth="6" />
            <motion.circle 
              cx="64" cy="64" r="56" fill="transparent" stroke="var(--color-secondary)" strokeWidth="6" 
              strokeDasharray="351.8"
              initial={{ strokeDashoffset: 351.8 }}
              animate={{ strokeDashoffset: 351.8 * (1 - 0.95) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-serif-italic font-bold text-secondary">95%</span>
          </div>
        </div>

        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-secondary/10 rounded-full blur-[80px]" />
      </Card>

      {/* GPA Trend */}
      <Card className="md:col-span-12 p-6 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-h3 text-slate-800">GPA Trend</h3>
          <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +0.12
          </span>
        </div>
        
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={gpaTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="gpa" 
                stroke="#967BB6" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#967BB6', strokeWidth: 0 }} 
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>

    {/* Semester List */}
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="font-h3 text-slate-800">Semester Summary</h3>
        <button className="text-sm font-semibold text-primary hover:underline">View All</button>
      </div>

      <div className="grid gap-4">
        <Card className="p-5 border-l-[6px] border-lavender cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => onNavigate('courses')}>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-h3 text-slate-800">Semester 4</span>
                <span className="bg-lavender-tint text-lavender px-3 py-0.5 rounded-full text-[10px] font-bold">IN PROGRESS</span>
              </div>
              <p className="text-slate-500 text-sm">Spring 2024 • 5 Courses</p>
            </div>
            <div className="text-right">
              <div className="font-lexend font-bold text-xl text-lavender">3.92</div>
              <div className="label-caps text-[10px] text-slate-400">Estimated</div>
            </div>
          </div>
        </Card>

        <Card className="p-5 cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-h3 text-slate-800">Semester 3</h3>
              <p className="text-slate-500 text-sm">Fall 2023 • 6 Courses</p>
            </div>
            <div className="text-right">
              <div className="font-lexend font-bold text-xl text-slate-700">3.78</div>
              <div className="label-caps text-[10px] text-slate-400">Finalized</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const Courses = ({ onNavigate }: { onNavigate: (t: Tab) => void }) => (
  <div className="space-y-8">
    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-[40px] p-8 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
      <div className="relative z-10">
        <p className="label-caps text-white/80 mb-2">Fall 2023</p>
        <h1 className="font-h2 text-white mb-6">Semester 1</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-4 border border-white/20">
            <p className="label-caps text-white/70 text-[10px]">Semester GPA</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif-italic font-bold">3.85</span>
              <span className="text-white/60 text-sm italic">/ 4.0</span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-4 border border-white/20">
            <p className="label-caps text-white/70 text-[10px]">Total Credits</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif-italic font-bold">15</span>
              <span className="text-white/60 text-sm italic">Earned</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <h2 className="font-h3">Courses</h2>
      <button className="flex items-center gap-2 text-primary font-bold text-xs tracking-widest uppercase">
        <Sliders className="w-4 h-4" /> Sort
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { code: 'CS101', name: 'Introduction to Computing', grade: 'A', percent: '94.2%', credits: '3.0', points: '12.0' },
        { code: 'MATH204', name: 'Linear Algebra', grade: 'A-', percent: '91.8%', credits: '4.0', points: '14.8' },
        { code: 'PHYS101', name: 'General Physics I', grade: 'B+', percent: '88.5%', credits: '4.0', points: '13.2' },
        { code: 'ENG210', name: 'Academic Writing', grade: 'A', percent: '96.0%', credits: '3.0', points: '12.0' },
      ].map((course, idx) => (
        <Card key={idx} className="group hover:border-lavender transition-all cursor-pointer relative" onClick={() => onNavigate('course-detail')}>
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-lavender/40 group-hover:bg-lavender transition-colors" />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-lavender-tint text-lavender px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2 inline-block leading-none">
                  {course.code}
                </span>
                <h3 className="font-lexend font-semibold text-lg text-slate-800 leading-tight pr-4">
                  {course.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-secondary font-bold text-2xl">{course.grade}</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{course.percent}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="label-caps text-[9px] text-slate-400 mb-0.5">Credits</span>
                  <span className="font-bold text-slate-700 text-sm">{course.credits}</span>
                </div>
                <div className="flex flex-col">
                  <span className="label-caps text-[9px] text-slate-400 mb-0.5">Points</span>
                  <span className="font-bold text-slate-700 text-sm">{course.points}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Card>
      ))}

      <button className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 hover:border-lavender hover:text-lavender transition-all group bg-white/50">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:bg-lavender-tint">
          <Plus className="w-6 h-6" />
        </div>
        <span className="font-lexend font-semibold">Add New Course</span>
        <span className="label-caps text-[9px] mt-1 opacity-60">Manage Curriculum</span>
      </button>
    </div>
  </div>
);

const CourseDetail = () => (
  <div className="space-y-8">
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-lavender font-semibold text-xs tracking-widest uppercase">
        <ArrowLeft className="w-4 h-4" /> Courses / Details
      </div>
      <h2 className="font-h2 mt-2">Intro to Psychology</h2>
      <div className="flex gap-3 mt-3">
        <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">PSYC101</span>
        <span className="px-3 py-1 rounded-full bg-lavender-tint text-lavender text-[10px] font-bold uppercase tracking-widest">Fall 2024</span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8 p-8 bg-lavender rounded-3xl shadow-xl text-white relative overflow-hidden flex flex-col justify-between min-h-[180px]">
        <div className="relative z-10">
          <p className="label-caps opacity-80 mb-2">Current Calculated Grade</p>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold">88.4%</span>
            <span className="text-2xl font-bold opacity-60">A-</span>
          </div>
        </div>
        <div className="relative z-10 mt-6">
          <div className="flex justify-between label-caps text-[10px] mb-2 opacity-80">
            <span>Course Completion</span>
            <span>45%</span>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div className="bg-white h-full transition-all duration-1000" style={{ width: '45%' }} />
          </div>
        </div>
        {/* Subtle icon background */}
        <GraduationCap className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 rotate-12" />
      </div>

      <Card className="md:col-span-4 p-6 flex flex-col justify-center bg-white">
        <p className="label-caps text-slate-400 mb-4">Weighted Total</p>
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="34" fill="transparent" stroke="var(--color-surface-container)" strokeWidth="6" />
              <circle cx="40" cy="40" r="34" fill="transparent" stroke="var(--color-lavender)" strokeWidth="6" 
                strokeDasharray="213.6" strokeDashoffset={213.6 * (1 - 0.9)} strokeLinecap="round" />
            </svg>
            <span className="absolute font-bold text-lavender">90%</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">Weight Setup</p>
            <p className="label-caps text-error text-[10px]">Missing 10%</p>
          </div>
        </div>
      </Card>
    </div>

    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-h3">Assessment Setup</h3>
        <button className="flex items-center gap-2 text-lavender font-bold hover:opacity-80 transition-opacity">
          <Plus className="w-5 h-5 p-1 bg-lavender-tint rounded-full" /> 
          <span className="text-sm">Add Component</span>
        </button>
      </div>

      <div className="space-y-3">
        {[
          { name: 'IA1: Research Paper', max: 100, weight: 20 },
          { name: 'Midterm Examination', max: 100, weight: 30 },
          { name: 'Final Project', max: 50, weight: 40 },
        ].map((item, idx) => (
          <Card key={idx} className="p-4 flex flex-col md:flex-row gap-6 md:items-center bg-white">
            <div className="flex-grow space-y-1">
              <label className="label-caps text-[10px] text-slate-400">Assessment Name</label>
              <input 
                defaultValue={item.name} 
                className="w-full bg-transparent border-b border-slate-100 focus:border-lavender focus:ring-0 px-0 py-2 font-medium text-slate-800 outline-none"
              />
            </div>
            <div className="flex gap-6">
              <div className="w-24 space-y-1">
                <label className="label-caps text-[10px] text-slate-400">Max Score</label>
                <input 
                  defaultValue={item.max} 
                  className="w-full bg-transparent border-b border-slate-100 focus:border-lavender focus:ring-0 px-0 py-2 font-bold text-slate-800 outline-none" 
                  type="number" 
                />
              </div>
              <div className="w-24 space-y-1">
                <label className="label-caps text-[10px] text-slate-400">Weight %</label>
                <input 
                  defaultValue={item.weight} 
                  className="w-full bg-transparent border-b border-slate-100 focus:border-lavender focus:ring-0 px-0 py-2 font-bold text-lavender outline-none" 
                  type="number" 
                />
              </div>
              <button className="p-2 text-slate-300 hover:text-error transition-colors self-end mb-1">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>

    <section className="space-y-6">
      <h3 className="font-h3">Enter Scores</h3>
      <Card className="bg-white overflow-hidden rounded-2xl">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low border-b border-slate-100">
            <tr>
              <th className="p-4 label-caps text-[10px] text-slate-500">Component</th>
              <th className="p-4 label-caps text-[10px] text-slate-500 text-right">Actual Score</th>
              <th className="p-4 label-caps text-[10px] text-slate-500 text-right w-24">Max</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
               { name: 'IA1: Research Paper', score: 92, max: 100 },
               { name: 'Midterm Examination', score: 86, max: 100 },
               { name: 'Final Project', score: null, max: 50 },
            ].map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50">
                <td className="p-4 font-medium text-slate-800">{row.name}</td>
                <td className="p-4 text-right">
                  <input 
                    defaultValue={row.score || ''} 
                    placeholder="--"
                    className="w-20 bg-lavender-tint/30 border border-lavender/10 rounded-lg px-3 py-1.5 text-right font-bold text-lavender focus:ring-2 focus:ring-lavender focus:border-lavender outline-none"
                    type="number"
                  />
                </td>
                <td className="p-4 text-right text-slate-400 font-medium">/ {row.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>

    <button className="w-full py-5 bg-primary text-white font-serif-italic font-bold rounded-2xl shadow-xl shadow-primary/10 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4">
      <Save className="w-5 h-5" /> Save Configuration
    </button>
  </div>
);

const Planner = () => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-100">
      <div>
        <p className="label-caps text-lavender tracking-widest mb-1">Study Dashboard</p>
        <h2 className="font-h1">Study Planner</h2>
      </div>
      <Card className="bg-white px-6 py-4 flex items-center gap-4 relative overflow-hidden group border-none shadow-md">
        <div className="w-12 h-12 rounded-full bg-lavender-tint flex items-center justify-center text-lavender z-10">
          <Fire className="w-6 h-6 fill-current" />
        </div>
        <div className="relative z-10">
          <p className="label-caps text-[9px] text-slate-400">Study Streak</p>
          <p className="text-2xl font-bold text-slate-800">12 Days</p>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
          <Fire className="w-20 h-20" />
        </div>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-8">
        <Card className="p-8 bg-white border-none shadow-md">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-h3">Weekly Goals</h3>
            <button className="text-slate-300 hover:text-lavender transition-colors"><Plus className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Clock, goal: 'Study 15 hours', current: '12h', progress: 80, detail: '12h of 15h completed' },
              { icon: BarChart3, goal: 'Finish Psychology Paper', current: 'Drafting', progress: 40, detail: 'Drafting phase' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-container-low border border-slate-100 space-y-4">
                <div className="flex justify-between items-center text-lavender">
                  <item.icon className="w-5 h-5" />
                  <span className="font-bold text-sm">{item.progress}%</span>
                </div>
                <p className="font-bold text-slate-800">{item.goal}</p>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-lavender h-full rounded-full" style={{ width: `${item.progress}%` }} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.detail}</p>
              </div>
            ))}
          </div>
        </Card>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-h3">Study Tasks</h3>
            <button className="text-lavender font-bold text-sm flex items-center gap-2 px-3 py-1 bg-lavender-tint rounded-full">
              <Plus className="w-4 h-4" /> Add Task
            </button>
          </div>
          <div className="space-y-3">
             {[
               { title: 'Review Organic Chemistry - Ch 4', time: 'Today, 4:00 PM', tag: 'URGENT', tagColor: 'error', color: 'error' },
               { title: 'Annotate Macroeconomics Case Study', time: 'Tomorrow • Quiz Prep', tag: 'ASSESSMENT', tagColor: 'lavender', color: 'primary' },
               { title: 'Data Structures: Practice Heap Sort', time: 'Fri, Oct 24 • Self Study', tag: null, color: 'slate-300' },
             ].map((task, idx) => (
               <Card key={idx} className="p-4 flex items-center gap-4 hover:shadow-md transition-all group cursor-pointer bg-white">
                 <div className={cn("w-1.5 h-12 rounded-full", `bg-${task.color}`)} />
                 <input type="checkbox" className="w-5 h-5 rounded border-slate-200 text-lavender focus:ring-lavender" />
                 <div className="flex-grow">
                   <h4 className="font-bold text-slate-800 group-hover:text-lavender transition-colors">{task.title}</h4>
                   <p className="text-xs text-slate-400 font-medium mt-0.5">{task.time}</p>
                 </div>
                 {task.tag && (
                   <span className={cn(
                     "px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase",
                     task.tagColor === 'error' ? "bg-error-container text-error" : "bg-lavender-tint text-lavender"
                   )}>{task.tag}</span>
                 )}
               </Card>
             ))}
          </div>
        </section>
      </div>

      <div className="lg:col-span-4 space-y-8">
        <Card className="p-8 border-none shadow-md bg-white">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-error" />
            <h3 className="font-h3 text-slate-800">Focus Areas</h3>
          </div>
          <p className="text-sm text-slate-500 italic mb-6">Prioritize these courses to improve your GPA performance.</p>
          <div className="space-y-4">
             {[
               { code: 'CS201', name: 'Algorithms', status: 'AT RISK', color: 'error', score: 62 },
               { code: 'STAT302', name: 'Bio-Stats', status: 'NEEDS REVIEW', color: 'lavender', score: 74 },
             ].map((focus, idx) => (
               <div key={idx} className={cn(
                 "p-5 rounded-3xl border flex items-center justify-between",
                 focus.color === 'error' ? "bg-error-container/20 border-error/10" : "bg-lavender-tint/20 border-lavender/10"
               )}>
                 <div>
                   <p className={cn("label-caps text-[10px] mb-1 font-black", focus.color === 'error' ? "text-error" : "text-lavender")}>
                    {focus.status}
                   </p>
                   <p className="font-bold text-slate-800">{focus.code}: {focus.name}</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Next Exam in {idx + 3} days</p>
                 </div>
                 <div className={cn(
                   "w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-xs",
                   focus.color === 'error' ? "border-error text-error" : "border-lavender text-lavender"
                 )}>
                   {focus.score}%
                 </div>
               </div>
             ))}
          </div>
        </Card>

        <section className="bg-lavender rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <Zap className="absolute -right-8 -bottom-8 w-40 h-40 opacity-10" />
          <h4 className="font-h2 text-xl mb-4 leading-snug">You're on track!</h4>
          <p className="text-sm opacity-80 mb-8 leading-relaxed">You've completed 85% of your planned study sessions this month.</p>
          <button className="w-full py-4 bg-white text-lavender font-bold rounded-2xl hover:bg-slate-50 active:scale-[0.95] transition-all">
            View Analytics
          </button>
        </section>

        <div className="p-6 bg-surface-container-low rounded-3xl border border-slate-100 border-dashed">
          <p className="label-caps text-[9px] text-slate-400 mb-2">Pro Tip</p>
          <p className="text-sm text-on-surface-variant italic leading-relaxed">
            "Focus sessions longer than 45 minutes without a break decrease retention by 20%."
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Analytics = () => (
  <div className="space-y-10">
    <div className="max-w-xl">
      <h2 className="font-h1">Performance Insights</h2>
      <p className="text-slate-500 mt-2">Predict your academic future and identify areas that need focus.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left Pane */}
      <div className="lg:col-span-5 space-y-10">
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-h3">Score Distribution</h3>
            <BarChart3 className="w-6 h-6 text-lavender" />
          </div>
          <Card className="p-6 h-[280px] bg-white border-none shadow-lg">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="quizzes" fill="#6a5188" radius={[4, 4, 0, 0]} />
                <Bar dataKey="exams" fill="#d8bafa" radius={[4, 4, 0, 0]} />
                <Bar dataKey="projects" fill="#8369a3" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </section>

        <section className="bg-lavender text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-7 h-7 fill-white" />
              <h3 className="font-h3 text-white">Target Reached?</h3>
            </div>
            <p className="text-white/80 text-sm mb-6 max-w-xs">Based on your current average in Linear Algebra (MATH201):</p>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl">
              <p className="label-caps text-[10px] text-white/60 mb-2">Goal: Grade A (90%)</p>
              <h4 className="text-2xl font-bold leading-tight">
                You need a <span className="text-primary-fixed italic underline decoration-wavy">92%</span> on your Final Exam.
              </h4>
            </div>
            <div className="mt-8 flex justify-end">
              <button className="bg-white text-lavender px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform active:scale-95 shadow-md">
                Set New Target
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <LineChart className="w-56 h-56 -mr-16 -mt-16" />
          </div>
        </section>
      </div>

      {/* Right Pane: Predictor */}
      <div className="lg:col-span-7">
        <Card className="p-10 bg-white border-none shadow-lg h-full flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h3 className="font-h3">Grade Predictor</h3>
              <p className="text-slate-400 text-sm mt-1">Simulate future scores to see your final grade impact.</p>
            </div>
            <div className="relative min-w-[240px]">
              <select className="flex-grow bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-lavender font-medium text-slate-800 appearance-none">
                <option>Linear Algebra (MATH201)</option>
                <option>Data Structures (CS302)</option>
                <option>Quantum Mechanics (PHYS101)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow">
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-2">
                <h4 className="label-caps text-slate-400 font-bold tracking-[.2em] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Remaining Assessments
                </h4>
                <span className="text-[10px] font-bold text-lavender bg-lavender-tint px-2 py-0.5 rounded-full uppercase">40% Total</span>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: 'Final Exam (30%)', value: 92 },
                  { label: 'Homework 5 (5%)', value: 100 },
                  { label: 'Project 2 (5%)', value: 85 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-sm font-bold text-slate-700">{item.label}</label>
                      <div className="flex items-center gap-2">
                        <input className="w-16 bg-slate-50 border border-slate-200 text-center rounded-xl py-1.5 font-bold text-lavender focus:ring-2 focus:ring-lavender outline-none" defaultValue={item.value}/>
                        <span className="text-xs font-bold text-slate-300">%</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full">
                      <div className="bg-lavender h-full rounded-full shadow-[0_0_8px_rgba(150,123,182,0.4)]" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-surface-container-low rounded-[40px] border-4 border-dashed border-white">
              <div className="relative w-56 h-56 flex items-center justify-center mb-10">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="112" cy="112" r="100" fill="transparent" stroke="#ffffff" strokeWidth="12" />
                  <motion.circle 
                    cx="112" cy="112" r="100" fill="transparent" stroke="var(--color-lavender)" strokeWidth="12" 
                    strokeDasharray="628.3"
                    initial={{ strokeDashoffset: 628.3 }}
                    animate={{ strokeDashoffset: 628.3 * (1 - 0.902) }}
                    transition={{ duration: 1, delay: 0.5 }}
                    strokeLinecap="round"
                    className="drop-shadow-[0_4px_8px_rgba(106,81,136,0.2)]"
                  />
                </svg>
                <div className="absolute flex flex-col items-center text-center">
                  <span className="label-caps text-[10px] text-slate-400 font-black mb-1">Predicted</span>
                  <span className="text-6xl font-black text-slate-800 leading-none">90.2</span>
                  <span className="text-xl font-bold text-lavender mt-2">Grade A</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white p-5 rounded-3xl text-center shadow-sm">
                  <p className="label-caps text-[9px] text-slate-300 mb-1">Current</p>
                  <p className="text-xl font-black text-slate-700">85.0%</p>
                </div>
                <div className="bg-white p-5 rounded-3xl text-center shadow-sm">
                  <p className="label-caps text-[9px] text-slate-300 mb-1">Delta</p>
                  <p className="text-xl font-black text-emerald-500">+5.2%</p>
                </div>
              </div>

              <button className="w-full mt-10 bg-lavender text-white py-5 rounded-[24px] font-lexend font-bold shadow-xl shadow-lavender/30 active:scale-95 transition-all">
                Save Prediction
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const SettingsPage = () => (
   <div className="space-y-10">
    <div className="max-w-xl">
      <h2 className="font-h1">Settings</h2>
      <p className="text-slate-500 mt-2">Manage your account preferences and application configuration.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <Card className="lg:col-span-12 p-8 bg-white border-none shadow-md">
        <h3 className="font-h3 mb-8">Theme & Appearance</h3>
        <div className="space-y-10">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-bold text-slate-700 tracking-tight">Color Scheme</p>
            <div className="flex flex-wrap gap-6">
              {[
                { name: 'Lavender', color: '#967BB6', active: true },
                { name: 'Mint', color: '#98D8C8' },
                { name: 'Rose', color: '#F4A7B9' },
                { name: 'Ocean', color: '#7BB6D9' },
              ].map((scheme, idx) => (
                <button key={idx} className="flex flex-col items-center gap-3 group">
                  <div 
                    className={cn(
                      "w-14 h-14 rounded-full flex items-center justify-center transition-all",
                      scheme.active ? "ring-2 ring-offset-4 ring-lavender" : "hover:scale-105"
                    )}
                    style={{ backgroundColor: scheme.color }}
                  >
                    {scheme.active && <NavItem icon={CheckCircle2} active={true} label="" onClick={() => {}} />}
                  </div>
                  <span className={cn("text-xs font-bold", scheme.active ? "text-lavender" : "text-slate-400")}>{scheme.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-slate-50 flex items-center justify-between">
            <div>
              <p className="font-bold text-lg text-slate-800">Dark Mode</p>
              <p className="text-sm text-slate-400 mt-0.5">Switch between light and dark themes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-lavender" />
            </label>
          </div>
        </div>
      </Card>

      <section className="lg:col-span-7 space-y-6">
        <Card className="bg-white shadow-md border-none overflow-hidden">
          <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-lexend font-bold text-slate-700">Grade Scales</h3>
            <button className="flex items-center gap-2 text-lavender font-bold text-sm tracking-tight"><Plus className="w-4 h-4 p-0.5 bg-lavender-tint rounded-full" /> Add Level</button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 mb-2 border-b border-slate-50">
                <th className="px-8 py-4 label-caps text-[10px] text-slate-400">Grade Letter</th>
                <th className="px-8 py-4 label-caps text-[10px] text-slate-400">Range (Min)</th>
                <th className="px-8 py-4 label-caps text-[10px] text-slate-400">Range (Max)</th>
                <th className="px-8 py-4 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { letter: 'A', min: 80, max: 100 },
                { letter: 'B', min: 70, max: 79 },
                { letter: 'C', min: 60, max: 69 },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="px-8 py-5">
                    <input defaultValue={row.letter} className="w-16 h-12 bg-white border border-slate-200 rounded-2xl text-center font-bold text-slate-800 focus:ring-2 focus:ring-lavender focus:border-lavender outline-none" />
                  </td>
                  <td className="px-8 py-5">
                    <input defaultValue={row.min} className="w-24 h-12 bg-white border border-slate-200 rounded-2xl px-5 font-bold text-slate-800 focus:ring-2 focus:ring-lavender focus:border-lavender outline-none" type="number" />
                  </td>
                  <td className="px-8 py-5">
                    <input defaultValue={row.max} className="w-24 h-12 bg-white border border-slate-200 rounded-2xl px-5 font-bold text-slate-800 focus:ring-2 focus:ring-lavender focus:border-lavender outline-none" type="number" />
                  </td>
                  <td className="px-8 py-5">
                    <button className="text-slate-300 hover:text-error transition-colors"><Trash2 className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      <div className="lg:col-span-5 space-y-6">
        <Card className="bg-white border-none shadow-md overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50">
             <h3 className="font-lexend font-bold text-slate-700">GPA Mapping</h3>
          </div>
          <div className="p-8 space-y-6">
             {[
               { label: 'Grade A', val: 4.0 },
               { label: 'Grade B', val: 3.0 },
               { label: 'Grade C', val: 2.0 },
             ].map((map, idx) => (
               <div key={idx} className="flex items-center justify-between">
                 <span className="font-bold text-slate-700">{map.label}</span>
                 <div className="flex items-center gap-4">
                    <TrendingUp className="w-4 h-4 text-slate-300" />
                    <input defaultValue={map.val.toFixed(1)} step="0.1" type="number" className="w-24 h-12 bg-slate-50 border border-slate-100 rounded-2xl px-5 text-right font-black text-lavender focus:ring-2 focus:ring-lavender outline-none" />
                 </div>
               </div>
             ))}
          </div>
        </Card>

        <Card className="p-6 bg-white border-none shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-800">Credit-based GPA</p>
              <p className="text-xs text-slate-400 mt-1 italic tracking-tight">Weight individual grades by course credits</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointerScale">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lavender" />
            </label>
          </div>
        </Card>

        <button className="w-full py-5 bg-lavender text-white font-lexend font-bold rounded-3xl shadow-xl shadow-lavender/30 active:scale-[0.98] transition-transform flex items-center justify-center gap-3">
          <Save className="w-5 h-5" /> Update Configuration
        </button>
      </div>
    </div>
   </div>
);

// --- Layout ---

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('dashboard');

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-outline-variant px-12 h-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary rounded-full text-white shadow-lg">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-serif-italic text-2xl font-bold text-primary tracking-tight">Oasis Tracker</span>
        </div>
        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
          >
            <Search className="w-5 h-5" />
          </motion.button>
          <div className="w-10 h-10 rounded-full border-2 border-lavender/20 overflow-hidden shadow-inner cursor-pointer hover:border-lavender/60 transition-all">
            <img 
              src="https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/avatars/02.png" 
              alt="User" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentTab === 'dashboard' && <Dashboard onNavigate={setCurrentTab} />}
            {currentTab === 'semesters' && <Courses onNavigate={setCurrentTab} />}
            {currentTab === 'courses' && <Courses onNavigate={setCurrentTab} />}
            {currentTab === 'course-detail' && <CourseDetail />}
            {currentTab === 'planner' && <Planner />}
            {currentTab === 'analytics' && <Analytics />}
            {currentTab === 'settings' && <SettingsPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FAB - Global Plus */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-32 right-8 w-16 h-16 bg-lavender text-white rounded-full shadow-2xl flex items-center justify-center z-40 lg:w-14 lg:h-14 lg:bottom-10 lg:right-10"
      >
        <Plus className="w-8 h-8 lg:w-7 lg:h-7" />
      </motion.button>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] px-4 py-3 pb-safe-offset-2 flex justify-around items-end">
        <NavItem active={currentTab === 'dashboard'} icon={LayoutDashboard} label="Dashboard" onClick={() => setCurrentTab('dashboard')} />
        <NavItem active={currentTab === 'planner'} icon={Calendar} label="Planner" onClick={() => setCurrentTab('planner')} />
        <NavItem active={currentTab === 'analytics'} icon={LineChart} label="Analytics" onClick={() => setCurrentTab('analytics')} />
        <NavItem active={currentTab === 'courses' || currentTab === 'course-detail'} icon={GraduationCap} label="Courses" onClick={() => setCurrentTab('courses')} />
        <NavItem active={currentTab === 'settings'} icon={Sliders} label="Settings" onClick={() => setCurrentTab('settings')} />
      </nav>
    </div>
  );
}
