/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ALL_SLIDES, GUIDE_LESSONS } from './data/guideData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SlideContent } from './components/SlideContent';
import { Footer } from './components/Footer';
import { AllCheckpointsModal } from './components/AllCheckpointsModal';
import { ExportHtmlModal } from './components/ExportHtmlModal';

export default function App() {
  // Current Slide Index
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('gws_guide_current_slide');
      if (saved !== null) {
        const val = parseInt(saved, 10);
        if (!isNaN(val) && val >= 0 && val < ALL_SLIDES.length) {
          return val;
        }
      }
    } catch (e) {
      console.warn('localStorage error', e);
    }
    return 0;
  });

  // Checklist completion mapping: key -> boolean
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('gws_guide_checklist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('localStorage error', e);
    }
    return {};
  });

  // UI States
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [expandedLessons, setExpandedLessons] = useState<number[]>([1]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isCheckpointsModalOpen, setIsCheckpointsModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const currentStep = ALL_SLIDES[currentSlideIndex] || ALL_SLIDES[0];

  // Keep accordion in sync with current lesson
  useEffect(() => {
    if (currentStep) {
      setExpandedLessons(prev => {
        if (!prev.includes(currentStep.lessonId)) {
          return [...prev, currentStep.lessonId];
        }
        return prev;
      });
    }
  }, [currentStep.lessonId]);

  // Save current slide to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gws_guide_current_slide', currentSlideIndex.toString());
    } catch (e) {}
  }, [currentSlideIndex]);

  // Save checklist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gws_guide_checklist', JSON.stringify(completedChecklist));
    } catch (e) {}
  }, [completedChecklist]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Handlers for Slide Navigation
  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex(prev => Math.min(ALL_SLIDES.length - 1, prev + 1));
  }, []);

  const handleSelectStep = (stepId: string) => {
    const idx = ALL_SLIDES.findIndex(s => s.id === stepId);
    if (idx !== -1) {
      setCurrentSlideIndex(idx);
    }
  };

  const handleToggleLessonAccordion = (lessonId: number) => {
    setExpandedLessons(prev => 
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleToggleCheckItem = (key: string) => {
    setCompletedChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleResetAllChecks = () => {
    if (window.confirm('모든 체크리스트 기록을 초기화하시겠습니까?')) {
      setCompletedChecklist({});
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Keyboard navigation listener (ArrowLeft, ArrowRight, PageUp, PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevSlide, handleNextSlide]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F8F9FA] text-[#1F2937]">
      {/* Header Bar */}
      <Header
        currentSlideIndex={currentSlideIndex}
        totalSlides={ALL_SLIDES.length}
        currentStep={currentStep}
        onPrev={handlePrevSlide}
        onNext={handleNextSlide}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        isSidebarOpen={isSidebarOpen}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        onOpenCheckpoints={() => setIsCheckpointsModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main Split: Left Sidebar + Central Slide Content */}
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentStepId={currentStep.id}
          onSelectStep={handleSelectStep}
          expandedLessons={expandedLessons}
          onToggleLessonAccordion={handleToggleLessonAccordion}
          completedChecklist={completedChecklist}
          onOpenCheckpoints={() => setIsCheckpointsModalOpen(true)}
        />

        {/* Central Main Viewport */}
        <main 
          tabIndex={0}
          className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 focus:outline-none"
        >
          <SlideContent
            step={currentStep}
            completedChecklist={completedChecklist}
            onToggleCheckItem={handleToggleCheckItem}
            onNextSlide={handleNextSlide}
            isLastSlide={currentSlideIndex === ALL_SLIDES.length - 1}
          />
        </main>
      </div>

      {/* Footer Navigation Bar */}
      <Footer
        currentSlideIndex={currentSlideIndex}
        totalSlides={ALL_SLIDES.length}
        onPrev={handlePrevSlide}
        onNext={handleNextSlide}
        onOpenCheckpoints={() => setIsCheckpointsModalOpen(true)}
      />

      {/* Checkpoints Overview Modal */}
      <AllCheckpointsModal
        isOpen={isCheckpointsModalOpen}
        onClose={() => setIsCheckpointsModalOpen(false)}
        completedChecklist={completedChecklist}
        onToggleCheckItem={handleToggleCheckItem}
        onResetAllChecks={handleResetAllChecks}
        onJumpToStep={handleSelectStep}
      />

      {/* Standalone HTML File Export Modal */}
      <ExportHtmlModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
