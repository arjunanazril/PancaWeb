export function ThemeScript() {
  const code = `
    try {
      var stored = localStorage.getItem('pancaruang-theme');
      var theme = stored === 'dark' || stored === 'light' ? stored : 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.style.colorScheme = theme;
    } catch (_) {}
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
