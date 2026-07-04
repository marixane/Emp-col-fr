import { useState } from 'react';

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const HOURS = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00'];

const createCell = () => ({ text: '', room: 1 });
const clampRoom = (value) => Math.min(Math.max(Number(value) || 1, 1), 80);

const createRows = () => DAYS.map((day) => ({
  day,
  cells: HOURS.reduce((acc, hour) => ({ ...acc, [hour]: createCell() }), {})
}));

const normalizeCell = (cell) => typeof cell === 'object' && cell !== null ? cell : { text: String(cell ?? ''), room: 1 };

export default function Tab() {
  const [school, setSchool] = useState('Établissement :');
  const [teacher, setTeacher] = useState('Professeur :');
  const [year, setYear] = useState('Année scolaire : 2026 / 2027');
  const [hours, setHours] = useState(HOURS);
  const [rows, setRows] = useState(createRows);

  const validateOnEnter = (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    event.currentTarget.blur();
  };

  const updateHour = (index, value) => {
    const oldHour = hours[index];
    setHours((current) => current.map((hour, i) => i === index ? value : hour));
    setRows((current) => current.map((row) => {
      const nextCells = { ...row.cells, [value]: normalizeCell(row.cells[oldHour]) };
      delete nextCells[oldHour];
      return { ...row, cells: nextCells };
    }));
  };

  const updateDay = (index, value) => {
    setRows((current) => current.map((row, i) => i === index ? { ...row, day: value } : row));
  };

  const updateCellText = (dayIndex, hour, value) => {
    setRows((current) => current.map((row, i) => i === dayIndex ? {
      ...row,
      cells: { ...row.cells, [hour]: { ...normalizeCell(row.cells[hour]), text: value } }
    } : row));
  };

  const updateRoom = (dayIndex, hour, value) => {
    setRows((current) => current.map((row, i) => i === dayIndex ? {
      ...row,
      cells: { ...row.cells, [hour]: { ...normalizeCell(row.cells[hour]), room: clampRoom(value) } }
    } : row));
  };

  return <main className="cahier-shell clean-cahier-shell">
    <section className="cahier-preview-zone">
      <div className="a4-page cahier-page">
        <header className="cahier-header">
          <input value={school} onChange={(e) => setSchool(e.target.value)} onKeyDown={validateOnEnter} />
          <h2>Cahier de texte</h2>
          <input value={teacher} onChange={(e) => setTeacher(e.target.value)} onKeyDown={validateOnEnter} />
          <input value={year} onChange={(e) => setYear(e.target.value)} onKeyDown={validateOnEnter} />
        </header>

        <table className="timetable-table">
          <thead>
            <tr>
              <th>Jour</th>
              {hours.map((hour, index) => <th key={`${hour}-${index}`}>
                <textarea value={hour} onChange={(e) => updateHour(index, e.target.value)} onKeyDown={validateOnEnter} rows="2" />
              </th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, dayIndex) => <tr key={dayIndex}>
              <td className="hour-cell day-cell">
                <textarea value={row.day} onChange={(e) => updateDay(dayIndex, e.target.value)} onKeyDown={validateOnEnter} rows="2" />
              </td>
              {hours.map((hour, hourIndex) => {
                const cell = normalizeCell(row.cells[hour]);
                return <td key={`${hour}-${hourIndex}`}>
                  <div className="timetable-cell-content">
                    <textarea
                      value={cell.text}
                      onChange={(e) => updateCellText(dayIndex, hour, e.target.value)}
                      onKeyDown={validateOnEnter}
                      placeholder="Classe / matière"
                      rows="4"
                    />
                    <label className="room-control">
                      <span>Salle</span>
                      <input
                        type="number"
                        min="1"
                        max="80"
                        value={cell.room}
                        onChange={(e) => updateRoom(dayIndex, hour, e.target.value)}
                        onKeyDown={validateOnEnter}
                      />
                    </label>
                  </div>
                </td>;
              })}
            </tr>)}
          </tbody>
        </table>

        <footer className="cahier-footer">
          <span>Signature :</span>
          <span>Observations :</span>
        </footer>
      </div>
    </section>
  </main>;
}
