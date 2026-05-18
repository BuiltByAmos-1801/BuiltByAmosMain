import { useMemo, useState } from 'react';
import { FiEdit3, FiHome, FiLock, FiLogOut, FiPlus, FiRefreshCw, FiSave, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { defaultSiteContent, getStoredContent, resetStoredContent, saveStoredContent } from '../data/siteContent.js';

const ADMIN_ID = 'amos1807';
const ADMIN_PASSWORD = 'Am0099os@1807';
const ADMIN_SESSION_KEY = 'builtByAmosAdminLoggedIn';

const sections = [
  {
    key: 'team',
    label: 'Team Members',
    emptyItem: { name: '', title: '', image: '', description: '', responsibilities: '', instagram: '', facebook: '', youtube: '', linkedin: '' },
    fields: ['name', 'title', 'image', 'description', 'responsibilities', 'instagram', 'facebook', 'youtube', 'linkedin']
  },
  {
    key: 'skills',
    label: 'Skills',
    emptyItem: { group: '', name: '', level: 80 },
    fields: ['group', 'name', 'level']
  },
  {
    key: 'clientProjects',
    label: 'Client Projects',
    emptyItem: { title: '', client: '', description: '', tags: '', status: '', live: '' },
    fields: ['title', 'client', 'description', 'tags', 'status', 'live']
  },
  {
    key: 'demoProjects',
    label: 'Demo Projects',
    emptyItem: { title: '', description: '', tags: '', live: '', github: '' },
    fields: ['title', 'description', 'tags', 'live', 'github']
  },
  {
    key: 'services',
    label: 'Services',
    emptyItem: { title: '', description: '' },
    fields: ['title', 'description']
  },
  {
    key: 'testimonials',
    label: 'Client Testimonials',
    emptyItem: { name: '', client: '', type: '', avatar: '', image: '', review: '' },
    fields: ['name', 'client', 'type', 'avatar', 'image', 'review']
  },
  {
    key: 'blogs',
    label: 'Blog Posts',
    emptyItem: { title: '', category: '', date: '', image: '', excerpt: '' },
    fields: ['title', 'category', 'date', 'image', 'excerpt']
  },
  {
    key: 'education',
    label: 'Education',
    emptyItem: { duration: '', school: '', course: '', detail: '' },
    fields: ['duration', 'school', 'course', 'detail']
  },
  {
    key: 'training',
    label: 'Training',
    emptyItem: { label: '', value: '' },
    fields: ['label', 'value']
  }
];

function labelFromField(field) {
  return field.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
}

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => window.sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true');
  const [loginForm, setLoginForm] = useState({ userId: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [content, setContent] = useState(getStoredContent);
  const [activeKey, setActiveKey] = useState('team');
  const activeSection = useMemo(() => sections.find((section) => section.key === activeKey), [activeKey]);

  const login = (event) => {
    event.preventDefault();

    if (loginForm.userId === ADMIN_ID && loginForm.password === ADMIN_PASSWORD) {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setIsLoggedIn(true);
      setLoginError('');
      return;
    }

    setLoginError('Invalid admin ID or password.');
  };

  const logout = () => {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsLoggedIn(false);
    setLoginForm({ userId: '', password: '' });
  };

  const updateItem = (index, field, value) => {
    setContent((current) => {
      const nextItems = [...(current[activeKey] || [])];
      nextItems[index] = { ...nextItems[index], [field]: field === 'level' ? Number(value) : value };
      return { ...current, [activeKey]: nextItems };
    });
  };

  const addItem = () => {
    setContent((current) => ({
      ...current,
      [activeKey]: [...(current[activeKey] || []), { ...activeSection.emptyItem }]
    }));
  };

  const removeItem = (index) => {
    setContent((current) => ({
      ...current,
      [activeKey]: current[activeKey].filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const save = () => {
    saveStoredContent(content);
  };

  const reset = () => {
    resetStoredContent();
    setContent(defaultSiteContent);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-midnight px-5 py-10 text-slate-100">
        <div className="absolute inset-0 bg-grid bg-[length:48px_48px] opacity-40" />
        <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-card sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan/10 text-3xl text-cyan">
              <FiLock />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan">Admin Login</p>
            <h1 className="mt-3 font-heading text-3xl font-bold text-white">Built By Amos Panel</h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">Enter your admin credentials to manage website content.</p>
          </div>

          <form className="space-y-4" onSubmit={login}>
            <label>
              <span className="mb-2 block text-sm font-bold text-slate-300">Admin ID</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan"
                value={loginForm.userId}
                onChange={(event) => setLoginForm((current) => ({ ...current, userId: event.target.value }))}
                autoComplete="username"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold text-slate-300">Password</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan"
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                autoComplete="current-password"
              />
            </label>

            {loginError && (
              <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
                {loginError}
              </p>
            )}

            <button className="button-primary w-full" type="submit">
              Login to Admin
            </button>

            <Link className="button-secondary w-full" to="/">
              <FiHome /> Back to Website
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight px-5 py-8 text-slate-100 sm:px-8 lg:px-12">
      <div className="section-shell">
        <header className="mb-8 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan">Built By Amos Admin</p>
            <h1 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">Website Content Manager</h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Manage team, skills, projects, services, testimonials, blogs, education, and training content from one dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="button-secondary" to="/">
              <FiHome /> Website
            </Link>
            <button className="button-secondary" onClick={reset} type="button">
              <FiRefreshCw /> Reset
            </button>
            <button className="button-secondary" onClick={logout} type="button">
              <FiLogOut /> Logout
            </button>
            <button className="button-primary" onClick={save} type="button">
              <FiSave /> Save Changes
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <aside className="glass rounded-3xl p-4">
            <div className="grid gap-2">
              {sections.map((section) => (
                <button
                  key={section.key}
                  className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                    activeKey === section.key ? 'bg-cyan text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setActiveKey(section.key)}
                  type="button"
                >
                  {section.label}
                  <span className="ml-2 text-xs opacity-70">({content[section.key]?.length || 0})</span>
                </button>
              ))}
            </div>
          </aside>

          <main className="glass rounded-3xl p-5 sm:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan">Manage</p>
                <h2 className="mt-1 font-heading text-3xl font-bold text-white">{activeSection.label}</h2>
              </div>
              <button className="button-primary" onClick={addItem} type="button">
                <FiPlus /> Add New
              </button>
            </div>

            <div className="space-y-5">
              {(content[activeKey] || []).map((item, index) => (
                <article key={index} className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <p className="flex items-center gap-2 font-heading text-xl font-bold text-white">
                      <FiEdit3 className="text-cyan" /> {item.title || item.name || item.school || item.label || `Item ${index + 1}`}
                    </p>
                    <button
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-400/30 text-red-300 transition hover:bg-red-500 hover:text-white"
                      onClick={() => removeItem(index)}
                      type="button"
                      aria-label="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {activeSection.fields.map((field) => (
                      <label key={field} className={['description', 'review', 'excerpt', 'detail'].includes(field) ? 'md:col-span-2' : ''}>
                        <span className="mb-2 block text-sm font-bold text-slate-300">{labelFromField(field)}</span>
                        {['description', 'review', 'excerpt', 'detail'].includes(field) ? (
                          <textarea
                            className="min-h-28 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan"
                            value={item[field] || ''}
                            onChange={(event) => updateItem(index, field, event.target.value)}
                          />
                        ) : (
                          <input
                            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan"
                            type={field === 'level' ? 'number' : 'text'}
                            min={field === 'level' ? 0 : undefined}
                            max={field === 'level' ? 100 : undefined}
                            value={item[field] || ''}
                            onChange={(event) => updateItem(index, field, event.target.value)}
                          />
                        )}
                      </label>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
