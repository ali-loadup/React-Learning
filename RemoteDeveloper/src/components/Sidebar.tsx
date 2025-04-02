export default function Sidebar({ children }: { children?: React.ReactNode }) {
  return <div className="sidebar">{children}</div>;
}

import { ReactNode } from "react";

export function SidebarTop({ children }: { children: ReactNode }) {
  return <div className="sidebar__top">{children}</div>;
}
