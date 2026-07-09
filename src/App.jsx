import { useEffect } from 'react';
import Tab from './Tab.jsx';

export default function App() {
  useEffect(() => {
    document.body.classList.add('cahier-tab-active');
    document.body.classList.remove('devoir-tab-active');

    const moveGroupsLower = () => {
      const candidates = [...document.querySelectorAll('.cahier-page > div')];
      const groupsContainer = candidates.find((element) => {
        const directChildren = [...element.children];
        if (directChildren.length !== 3) return false;
        const labels = directChildren.map((child) => child.textContent.replace(/\s+/g, ' ').trim().toUpperCase());
        return labels.some((text) => text.startsWith('1 AC'))
          && labels.some((text) => text.startsWith('2 AC'))
          && labels.some((text) => text.startsWith('3 AC'));
      });

      if (groupsContainer) {
        groupsContainer.style.marginTop = '48px';
      }
    };

    moveGroupsLower();
    const observer = new MutationObserver(moveGroupsLower);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.body.classList.remove('cahier-tab-active');
    };
  }, []);

  return <Tab />;
}