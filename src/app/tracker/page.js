'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import GlucoseChart from '@/components/GlucoseChart';
import { useSugar } from '@/context/SugarContext';
import { medications, glucoseTargets, patientProfile } from '@/data/healthData';
import { getSugarStatus } from '@/utils/helpers';

export default function TrackerPage() {
  const { currentSugar, sugarHistory, logSugar, initialized } = useSugar();
  const [glucoseInput, setGlucoseInput] = useState('');
  const [readingType, setReadingType] = useState('fasting');
  const [medLog, setMedLog] = useState({});
  const [activeTab, setActiveTab] = useState('glucose');
  const [showSuccess, setShowSuccess] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogGlucose = useCallback(() => {
    const level = parseInt(glucoseInput, 10);
    if (level > 0 && level < 600) {
      logSugar(level);
      setGlucoseInput('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [glucoseInput, logSugar]);

  const handleMedLog = useCallback((medId, time) => {
    setMedLog(prev => ({
      ...prev,
      [`${medId}-${time}`]: { taken: true, takenAt: new Date().toISOString() },
    }));
  }, []);

  const status = getSugarStatus(currentSugar);
  const trendData = sugarHistory.slice(-14);
  const medTakenCount = Object.keys(medLog).length;
  const totalDoses = medications.reduce((acc, m) => acc + m.timing.length, 0);

  const getTimeStatus = (timing) => {
    const [h, m] = timing.split(':').map(Number);
    const t = new Date(now);
    t.setHours(h, m, 0, 0);
    const diff = (now - t) / (1000 * 60);
    if (diff < -30) return 'upcoming';
    if (diff < 0) return 'due-soon';
    if (diff < 60) return 'due';
    return 'overdue';
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="mb-10 animate-fade-in-up">
          <span className="text-primary font-headline font-bold tracking-widest uppercase text-xs block mb-3">Daily Tracking</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-2">
            Health <span className="text-primary-container">Tracker</span>
          </h1>
          <p className="text-on-surface-variant text-lg">Log glucose readings, track medications, and monitor your daily health metrics.</p>
        </section>

        <div className="flex gap-2 mb-8">
          {[
            { key: 'glucose', label: 'Glucose Log', icon: 'monitoring' },
            { key: 'medications', label: 'Medications', icon: 'medication' },
            { key: 'emergency', label: 'Emergency', icon: 'emergency' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'bg-primary text-on-primary shadow-lg'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'glucose' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-headline font-bold text-xl">Current Status</h3>
                  <div className={`px-4 py-1.5 rounded-full font-bold text-sm ${
                    status.urgent ? 'bg-tertiary-container text-on-tertiary-container animate-pulse' : 'bg-primary-container text-on-primary-container'
                  }`}>
                    {status.label}
                  </div>
                </div>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-7xl font-extrabold font-headline text-on-surface">{currentSugar}</span>
                  <span className="text-xl text-on-surface-variant font-medium">mg/dL</span>
                </div>
                {currentSugar > 200 && (
                  <div className="bg-tertiary-container/10 border border-tertiary-container/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <span className="material-symbols-outlined text-tertiary">warning</span>
                    <div>
                      <p className="text-sm font-bold text-tertiary">Elevated Glucose Alert</p>
                      <p className="text-sm text-on-surface-variant mt-1">Your current level is significantly above target. Follow your emergency protocol and contact your healthcare provider.</p>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-on-surface-variant mb-3">14-Day Trend</p>
                  <GlucoseChart data={trendData} height={140} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
                  <h3 className="font-headline font-bold text-lg mb-4">Log Reading</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {['fasting', 'postMeal', 'postLunch', 'bedtime'].map(type => (
                        <button
                          key={type}
                          onClick={() => setReadingType(type)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                            readingType === type ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface-variant'
                          }`}
                        >
                          {glucoseTargets[type === 'postMeal' ? 'postMeal' : type]?.label || type}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={glucoseInput}
                        onChange={(e) => setGlucoseInput(e.target.value)}
                        placeholder="Enter mg/dL"
                        className="flex-1 h-12 px-4 bg-surface-container-low rounded-lg font-bold text-lg outline-none focus:ring-2 focus:ring-primary-container/30"
                        min="40"
                        max="600"
                      />
                      <button
                        onClick={handleLogGlucose}
                        disabled={!glucoseInput}
                        className="h-12 px-6 bg-primary text-white rounded-lg font-bold hover:opacity-90 disabled:opacity-40 transition-all"
                      >
                        Log
                      </button>
                    </div>
                    {showSuccess && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-primary font-bold flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Reading logged successfully
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
                  <h3 className="font-headline font-bold text-lg mb-3">Targets</h3>
                  <div className="space-y-3">
                    {Object.entries(glucoseTargets).filter(([k]) => k !== 'hba1c').map(([key, target]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-on-surface-variant">{target.label}</span>
                        <span className="text-sm font-bold">{target.min}-{target.max} {target.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div className="space-y-6">
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline font-bold text-xl">Today&apos;s Medication Schedule</h3>
                <div className="px-3 py-1.5 bg-surface-container-low rounded-full text-xs font-bold">
                  {medTakenCount}/{totalDoses} taken
                </div>
              </div>
              <div className="space-y-4">
                {medications.map(med => (
                  <div key={med.id} className={`bg-surface-container-low rounded-xl p-5 border-l-4 ${
                    med.color === 'primary' ? 'border-primary' : med.color === 'secondary' ? 'border-secondary' : 'border-tertiary'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-lg">{med.name}</h4>
                        <p className="text-sm text-on-surface-variant">{med.purpose}</p>
                      </div>
                      <span className="px-3 py-1 bg-surface-container-lowest rounded-full text-xs font-bold">
                        {med.frequency}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {med.timing.map(time => {
                        const key = `${med.id}-${time}`;
                        const isLogged = medLog[key]?.taken;
                        const timeStatus = getTimeStatus(time);
                        return (
                          <button
                            key={time}
                            onClick={() => !isLogged && handleMedLog(med.id, time)}
                            disabled={isLogged}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                              isLogged
                                ? 'bg-primary-container/10 text-primary line-through'
                                : timeStatus === 'overdue'
                                ? 'bg-tertiary-container text-on-tertiary-container hover:opacity-80'
                                : timeStatus === 'due'
                                ? 'bg-primary text-white hover:opacity-90 animate-pulse'
                                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                            }`}
                          >
                            <span className="material-symbols-outlined text-lg">{isLogged ? 'check_circle' : 'schedule'}</span>
                            {time}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-on-surface-variant italic flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">info</span>
                      {med.instructions}
                    </p>
                    {med.withFood && (
                      <p className="text-xs text-secondary font-bold mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">restaurant</span>
                        Take with food
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
              <h3 className="font-headline font-bold text-xl mb-4">Medication Adherence</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 h-3 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-500"
                    style={{ width: `${totalDoses > 0 ? (medTakenCount / totalDoses) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-lg font-extrabold font-headline text-primary">
                  {totalDoses > 0 ? Math.round((medTakenCount / totalDoses) * 100) : 0}%
                </span>
              </div>
              <p className="text-sm text-on-surface-variant">Consistent medication adherence can improve glucose control by 15-20%.</p>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="space-y-6">
            <div className="bg-tertiary-container/10 border border-tertiary-container/20 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-tertiary-container/30 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-3xl">emergency</span>
                </div>
                <div>
                  <h2 className="font-headline font-extrabold text-2xl text-tertiary">Emergency Protocol</h2>
                  <p className="text-on-surface-variant">For blood sugar above 350 mg/dL or severe symptoms</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: 'water_drop', title: 'Drink water immediately', desc: 'Stay hydrated to help your kidneys flush out excess sugar. Drink 2-3 glasses.' },
                  { icon: 'directions_walk', title: 'Light walking (10 min)', desc: 'A gentle stroll can help lower glucose levels safely. Avoid intense exercise.' },
                  { icon: 'block', title: 'Avoid all carbs right now', desc: 'No sugars, rice, bread, or fruits until levels stabilize below 200.' },
                  { icon: 'medication', title: 'Take prescribed medication', desc: 'If your doctor has prescribed insulin or tablets for high sugar, take as directed.' },
                  { icon: 'call', title: 'Call doctor if >350 for 2hrs', desc: 'If sugar stays above 350 mg/dL for more than 2 hours, seek medical help.' },
                  { icon: 'local_hospital', title: 'Nearest Hospital: SVIMS Tirupati', desc: 'Sri Venkateswara Institute of Medical Sciences, Alipiri Road, Tirupati.' },
                ].map((step, i) => (
                  <div key={i} className="bg-surface-container-lowest rounded-xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-tertiary">{step.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{step.title}</h4>
                      <p className="text-sm text-on-surface-variant">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
              <h3 className="font-headline font-bold text-xl mb-4">Emergency Contacts — Tirupati</h3>
              <div className="space-y-3">
                {[
                  { name: 'SVIMS Hospital Emergency', number: '0877-2287777', type: 'hospital' },
                  { name: 'Ruia Hospital Emergency', number: '0877-2289444', type: 'hospital' },
                  { name: 'Apollo Hospital Tirupati', number: '0877-2222222', type: 'hospital' },
                  { name: 'Ambulance (National)', number: '108', type: 'ambulance' },
                  { name: 'Your Diabetes Specialist', number: 'Update in Profile', type: 'doctor' },
                ].map((contact, i) => (
                  <div key={i} className="flex items-center justify-between bg-surface-container-low rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">
                        {contact.type === 'hospital' ? 'local_hospital' : contact.type === 'ambulance' ? 'emergency' : 'person'}
                      </span>
                      <span className="font-medium">{contact.name}</span>
                    </div>
                    <a href={`tel:${contact.number}`} className="font-bold text-primary hover:underline">{contact.number}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
