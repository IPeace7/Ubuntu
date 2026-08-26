import { useState } from "react";
import { BookOpen, X } from "lucide-react";

const JOURNAL_MOODS = [
  { label: "Happy", emoji: "😊" },
  { label: "Okay", emoji: "🙂" },
  { label: "Sad", emoji: "😔" },
  { label: "Anxious", emoji: "😰" },
  { label: "Calm", emoji: "😌" },
];

const SAMPLE_ENTRIES = [
  {
    date: "2026-08-05",
    mood: "Happy",
    text: "Had a wonderful morning walk. The weather was perfect and I felt so at peace.",
    tags: ["#gratitude", "#nature"],
    photo: "/story2.jpeg",
  },
  {
    date: "2026-08-12",
    mood: "Anxious",
    text: "Struggled a bit today but managed to breathe through it. Tomorrow is a new day.",
    tags: ["#selfcare", "#anxiety"],
    photo: "/story1.jpeg",
  },
  {
    date: "2026-08-18",
    mood: "Calm",
    text: "Spent the evening reading and journaling. Felt a sense of groundedness.",
    tags: ["#mindfulness", "#calm"],
    photo: "/story3.jpeg",
  },
];

export default function JournalPage() {
  const todayReal = new Date(2026, 7, 25); // Aug 25 2026

  const makeDateKey = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const initialPages = {
    "2026-08-25": {
      dateKey: "2026-08-25",
      mood: "Calm",
      leftText: "I find peace in the small moments — a quiet morning, the sound of rain, and the feeling of being present.\n\nTaking a walk while listening to music always helps me reset. Nature has a way of reminding me that everything passes.",
      rightText: "Setting boundaries has been a journey, but every small step counts. I am learning to say no without guilt.\n\nGrateful for the people who check in on me.",
      tags: ["#gratitude", "#selfcare", "#mindfulness"],
    },
    "2026-08-18": {
      dateKey: "2026-08-18",
      mood: "Anxious",
      leftText: "Felt overwhelmed today. Too many things on my mind and not enough hours to sort through them all.\n\nI took a few deep breaths and tried to focus on one thing at a time.",
      rightText: "It helped a little. I reminded myself that not everything needs to be solved today.\n\nWill try again tomorrow.",
      tags: ["#anxiety", "#breathe"],
    },
    "2026-08-12": {
      dateKey: "2026-08-12",
      mood: "Happy",
      leftText: "Had a really good day! Went outside for a long walk and enjoyed the fresh air. Felt connected to the world again.\n\nSmall wins matter.",
      rightText: "Called an old friend and we laughed for an hour straight. It felt so good to reconnect.\n\nReminder: reach out more often.",
      tags: ["#selfcare", "#connection", "#happy"],
    },
    "2026-08-05": {
      dateKey: "2026-08-05",
      mood: "Okay",
      leftText: "A quiet Tuesday. Nothing dramatic, just steady. Finished some tasks I had been putting off.",
      rightText: "Small progress is still progress.",
      tags: ["#productivity"],
    },
  };

  const [entries, setEntries] = useState(initialPages);
  const [currentKey, setCurrentKey] = useState("2026-08-25");
  const [showCalendar, setShowCalendar] = useState(false);
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(7); // 0-indexed August
  const [calSelected, setCalSelected] = useState(null);

  const entry = entries[currentKey];

  const updateEntry = (field, value) => {
    setEntries((prev) => ({
      ...prev,
      [currentKey]: { ...prev[currentKey], [field]: value },
    }));
  };

  const openOrCreateEntry = (key, y, m, d) => {
    if (!entries[key]) {
      const dateObj = new Date(y, m, d);
      const dateLabel = dateObj.toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      });
      setEntries((prev) => ({
        ...prev,
        [key]: { dateKey: key, mood: "Okay", leftText: "", rightText: "", tags: [], dateLabel },
      }));
    }
    setCurrentKey(key);
    setShowCalendar(false);
    setCalSelected(null);
  };

  const displayDate = entry?.dateLabel ||
    new Date(entry?.dateKey || currentKey).toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const weeks = [];
  let d = 1 - firstDay;
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let wd = 0; wd < 7; wd++, d++) {
      week.push(d > 0 && d <= daysInMonth ? d : null);
    }
    if (week.some((x) => x !== null)) weeks.push(week);
  }

  const monthLabel = new Date(calYear, calMonth, 1).toLocaleDateString("en-US", {
    month: "long", year: "numeric",
  });

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); }
    else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); }
    else setCalMonth((m) => m + 1);
  };

  const sortedKeys = Object.keys(entries).sort((a, b) => b.localeCompare(a));
  const currentIdx = sortedKeys.indexOf(currentKey);

  return (
    <div className="journal-page">
      <h2 className="journal-title">Journal</h2>

      <div className="notebook">
        {/* LEFT PAGE */}
        <div className="notebook-left">
          <div className="notebook-header">
            <span className="notebook-name">Maya's Private Space</span>
            <span className="notebook-date">{displayDate}</span>
          </div>

          <div className="journal-mood-section">
            <p className="journal-label">How are you feeling today?</p>
            <div className="journal-moods">
              {JOURNAL_MOODS.map((m) => (
                <button
                  key={m.label}
                  className={`journal-mood-btn ${entry?.mood === m.label ? "jm-active" : ""}`}
                  onClick={() => updateEntry("mood", m.label)}
                  title={m.label}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
          </div>

          <textarea
            className="journal-textarea"
            value={entry?.leftText || ""}
            onChange={(e) => updateEntry("leftText", e.target.value)}
            placeholder="Write your thoughts here..."
          />

          <div className="journal-tags">
            {(entry?.tags || []).map((t) => (
              <span key={t} className="journal-tag">{t}</span>
            ))}
          </div>
        </div>

        {/* SPINE */}
        <div className="notebook-spine">
          <div className="spine-ribbon" />
        </div>

        {/* RIGHT PAGE */}
        <div className="notebook-right">
          <button className="past-pages-btn" onClick={() => setShowCalendar(true)}>
            <BookOpen size={22} strokeWidth={1.5} />
            <span>My Past Pages</span>
          </button>
          <textarea
            className="journal-textarea journal-textarea-right"
            value={entry?.rightText || ""}
            onChange={(e) => updateEntry("rightText", e.target.value)}
            placeholder="Continue writing here..."
          />
        </div>
      </div>

      {/* PAGE TURNER */}
      <div className="page-turner">
        <button
          className="page-turn-btn"
          onClick={() => setCurrentKey(sortedKeys[currentIdx + 1])}
          disabled={currentIdx >= sortedKeys.length - 1}
        >
          ← Older
        </button>

        <span className="page-indicator">
          {sortedKeys.length - currentIdx} / {sortedKeys.length}
        </span>

        {currentIdx > 0 ? (
          <button
            className="page-turn-btn"
            onClick={() => setCurrentKey(sortedKeys[currentIdx - 1])}
          >
            Newer →
          </button>
        ) : (
          <button
            className="page-turn-btn page-turn-new"
            onClick={() => {
              const key = makeDateKey(todayReal.getFullYear(), todayReal.getMonth(), todayReal.getDate());
              openOrCreateEntry(key, todayReal.getFullYear(), todayReal.getMonth(), todayReal.getDate());
            }}
          >
            + New Entry
          </button>
        )}
      </div>

      <div className="journal-footer">
        <span>🔒 End-to-End Encrypted</span>
      </div>

      {/* CALENDAR MODAL */}
      {showCalendar && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) { setShowCalendar(false); setCalSelected(null); }
          }}
        >
          <div className="modal journal-calendar-modal">
            <div className="modal-header">
              <div><h2>🔒 My Past Pages</h2></div>
              <button className="modal-close" onClick={() => { setShowCalendar(false); setCalSelected(null); }}>
                <X size={19} />
              </button>
            </div>

            {/* Month nav */}
            <div className="cal-month-nav">
              <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
              <span className="cal-month-label">{monthLabel}</span>
              <button className="cal-nav-btn" onClick={nextMonth}>›</button>
            </div>

            <table className="cal-table">
              <thead>
                <tr>
                  {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weeks.map((week, wi) => (
                  <tr key={wi}>
                    {week.map((day, di) => {
                      const key = day ? makeDateKey(calYear, calMonth, day) : null;
                      const hasEntry = key && entries[key];
                      const isToday = calYear === 2026 && calMonth === 7 && day === 25;
                      const isSelected = key === calSelected;
                      return (
                        <td
                          key={di}
                          className={`cal-day ${isToday ? "cal-today" : ""} ${hasEntry ? "cal-has-entry" : ""} ${isSelected ? "cal-selected" : ""} ${day ? "cal-day-clickable" : ""}`}
                          onClick={() => day && setCalSelected(key)}
                        >
                          {day && (
                            <>
                              <span className="cal-num">{day}</span>
                              {hasEntry && (
                                <div className="cal-entry-preview">
                                  <span>{JOURNAL_MOODS.find((m) => m.label === entries[key].mood)?.emoji}</span>
                                </div>
                              )}
                            </>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Selected day actions */}
            {calSelected && (
              <div className="cal-entry-detail">
                <p className="cal-detail-date">
                  {new Date(calSelected + "T12:00:00").toLocaleDateString("en-US", {
                    weekday: "long", year: "numeric", month: "long", day: "numeric",
                  })}
                </p>
                {entries[calSelected] ? (
                  <>
                    <p className="cal-detail-snippet">
                      <strong>Mood:</strong>{" "}
                      {JOURNAL_MOODS.find((m) => m.label === entries[calSelected].mood)?.emoji}{" "}
                      {entries[calSelected].mood}
                    </p>
                    <p className="cal-detail-snippet">
                      {entries[calSelected].leftText.slice(0, 100)}{entries[calSelected].leftText.length > 100 ? "..." : ""}
                    </p>
                    <button
                      className="cal-open-btn"
                      onClick={() => openOrCreateEntry(calSelected)}
                    >
                      Open this entry →
                    </button>
                  </>
                ) : (
                  <>
                    <p className="cal-detail-snippet" style={{ color: "#8a8799" }}>No entry for this day yet.</p>
                    <button
                      className="cal-open-btn"
                      onClick={() => {
                        const [y, m, d] = calSelected.split("-").map(Number);
                        openOrCreateEntry(calSelected, y, m - 1, d);
                      }}
                    >
                      + Start an entry for this day
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
