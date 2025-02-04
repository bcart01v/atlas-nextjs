import Link from 'next/link';

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <aside>
        <nav>
          <ul>
            <li><Link href="/ui">Dashboard</Link></li>
            <li><Link href="/ui/topics/new">Create Topic</Link></li>
          </ul>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}