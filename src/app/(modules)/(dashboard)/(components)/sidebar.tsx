"use client";

import { Sidebar as PrimeSidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { SidebarModes, useDashboardStore } from "../stores/dashboard-store";
import { cn } from "@/lib/utils/cn/cn";
import { StyleClass } from "primereact/styleclass";
import { Ripple } from "primereact/ripple";
import { useRef } from "react";
import RenderIf from "@/lib/utils/cn/render-if";
import { DashboardNavigation } from "../(constants)/navigation/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Module = ({ item, index }: { item: (typeof DashboardNavigation)[0]; index: number }) => {
  const moduleRef = useRef(null);
  const sidebarMode = useDashboardStore((state) => state.sidebarMode);

  return (
    <li>
      <StyleClass selector="@next" enterFromClassName="hidden" leaveToClassName="hidden" nodeRef={moduleRef}>
        <div ref={moduleRef} className="p-ripple p-3 flex items-center justify-between cursor-pointer font-bold">
          <RenderIf condition={sidebarMode == SidebarModes.OPEN}>
            <span className="font-medium">{item.title}</span>
          </RenderIf>
          <i className="pi pi-chevron-down"></i>
          <Ripple />
        </div>
      </StyleClass>
      <ul className="list-none p-0 m-0 overflow-hidden">
        {item.children.map((child, index) => (
          <li className="mb-1" key={`${child.href}-${index}`}>
            <RenderIf condition={child.children.length == 0}>
              <ModuleItem child={child} index={index} />
            </RenderIf>
            <RenderIf condition={child.children.length > 0}>
              <ModuleItemWithChildren child={child} index={index} />
            </RenderIf>
          </li>
        ))}
      </ul>
    </li>
  );
};

const ModuleItem = ({ child, index }: { child: (typeof DashboardNavigation)[0]["children"][0]; index: number }) => {
  const sidebarMode = useDashboardStore((state) => state.sidebarMode);
  const pathName = usePathname();
  return (
    <Link
      href={child.href}
      className={cn(
        "p-ripple flex items-center cursor-pointer p-3 rounded-md hover:bg-primary hover:text-surface duration-300 transition-colors w-full",
        {
          "bg-primary text-surface": pathName == child.href,
        }
      )}
    >
      {child.icon}
      <RenderIf condition={sidebarMode == SidebarModes.OPEN}>
        <span className="font-medium ml-2">{child.title}</span>
      </RenderIf>
      <Ripple />
    </Link>
  );
};

const ModuleItemWithChildren = ({ child, index }: { child: (typeof DashboardNavigation)[0]["children"][2]; index: number }) => {
  const sidebarMode = useDashboardStore((state) => state.sidebarMode);
  const buttonRef = useRef(null);
  const pathname = usePathname();

  return (
    <>
      <StyleClass selector="@next" enterFromClassName="hidden" leaveToClassName="hidden" nodeRef={buttonRef}>
        <a
          ref={buttonRef}
          className="p-ripple p-3 flex rounded-md items-center transition-colors duration-150 justify-between w-full cursor-pointer font-bold"
        >
          {child.icon}
          <RenderIf condition={sidebarMode == SidebarModes.OPEN}>
            <span className="font-medium ml-2">{child.title}</span>
          </RenderIf>

          <i className="pi pi-chevron-down ml-auto mr-1"></i>
          <Ripple />
        </a>
      </StyleClass>

      <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all duration-300 ease-in-out">
        {child.children.map((child2, index) => (
          <li key={`${child2.href}-${index}`}>
            <Link
              href={child2.href}
              className={cn(
                "p-ripple flex items-center cursor-pointer p-3 rounded-md hover:bg-primary hover:text-surface duration-150 transition-colors w-full",
                {
                  "bg-primary text-surface": pathname == child2.href,
                }
              )}
            >
              {child2.icon}
              <RenderIf condition={sidebarMode == SidebarModes.OPEN}>
                <span className="font-medium ml-2">{child2.title}</span>
              </RenderIf>

              <Ripple />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default function SidebarButton() {
  const sidebarMode = useDashboardStore((state) => state.sidebarMode);
  const setSidebarMode = useDashboardStore((state) => state.setSidebarMode);

  return (
    <>
      <PrimeSidebar
        showCloseIcon={false}
        dismissable={false}
        className={cn({
          "bg-surface": true,
          "transition-all duration-300": true,
          "w-[18rem]": sidebarMode == SidebarModes.OPEN,
        })}
        modal={false}
        appendTo={"self"}
        onHide={() => {
          setSidebarMode(SidebarModes.HIDDEN);
        }}
        visible={sidebarMode != SidebarModes.HIDDEN}
        content={({}) => (
          <div className="min-h-screen flex relative lg:static w-full">
            <div className="overflow-y-auto w-full">
              {DashboardNavigation.map((item, index) => (
                <ul className="list-none p-3 m-0" key={`${item.title}-${index}`}>
                  <Module item={item} index={index} />
                </ul>
              ))}
            </div>
          </div>
        )}
      ></PrimeSidebar>
      <Button
        rounded
        text
        icon={"pi pi-bars"}
        onClick={() => {
          if (sidebarMode == SidebarModes.HIDDEN) {
            setSidebarMode(SidebarModes.OPEN);
          }

          if (sidebarMode == SidebarModes.OPEN) {
            setSidebarMode(SidebarModes.HIDDEN);
          }
        }}
      ></Button>
    </>
  );
}