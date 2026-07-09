import { useEffect } from 'react';
import Tab from './Tab.jsx';

export default function App() {
  useEffect(() => {
    document.body.classList.add('cahier-tab-active');
    document.body.classList.remove('devoir-tab-active');

    return () => {
      document.body.classList.remove('cahier-tab-active');
    };
  }, []);

  return <>
    <style>{`
      table.timetable-table {
        position: relative !important;
        top: -150px !important;
        transform: none !important;
      }

      .cahier-page > div[style*="grid-template-columns: repeat(3, 1fr)"] {
        margin-top: 96px !important;
      }
    `}</style>
    <Tab />
  </>;
}