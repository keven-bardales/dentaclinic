"use client";

import { Sidebar as PrimeSidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { SidebarModes, useDashboardStore } from "../(stores)/dashboard-store";
import { cn } from "@/lib/utils/cn";
import { StyleClass } from "primereact/styleclass";
import { Ripple } from "primereact/ripple";
import { useCallback, useEffect, useRef, useState } from "react";
import RenderIf from "@/lib/utils/render-if";
import { DashboardNavigation } from "../(constants)/navigation/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routeMatchesPattern, routeMatchesPatternActiveLink } from "@/lib/utils/route-match-pattern";

const Module = ({ item, index }: { item: (typeof DashboardNavigation)[0]; index: number }) => {
  const sidebarMode = useDashboardStore((state) => state.sidebarMode);
  const modulesState = useDashboardStore((state) => state.modulesState);
  const addNewModuleState = useDashboardStore((state) => state.addNewModuleState);
  const currentModule = modulesState.find((module) => module.name === item.title);

  const handleModuleClick = useCallback(() => {
    if (!currentModule) {
      addNewModuleState({ name: item.title, isOpen: true });
    } else {
      addNewModuleState({ name: item.title, isOpen: !currentModule.isOpen });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewModuleState, , currentModule]);

  return (
    <li>
      <div onClick={handleModuleClick} className="p-ripple px-3 py-1 flex items-center justify-between cursor-pointer font-bold">
        <span
          className={cn("font-bold", {
            hidden: sidebarMode === SidebarModes.HIDDEN,
          })}
        >
          {item.title}
        </span>
        <i className="pi pi-chevron-down"></i>
        <Ripple />
      </div>
      <ul
        className={cn("list-none p-0 m-0 overflow-hidden transition-all duration-200", {
          "h-0": !currentModule?.isOpen,
          "h-auto": currentModule?.isOpen,
        })}
      >
        {item.children.reduce((filteredChildren: any[], child, index) => {
          if (child?.renders !== false) {
            filteredChildren.push(
              <li className="mb-1" key={`${child.href}-${index}`}>
                <RenderIf condition={child.children.some((child) => child?.renders !== false)}>
                  <ModuleItemWithChildren child={child} index={index} />
                </RenderIf>
                <RenderIf condition={!child.children.some((child) => child?.renders !== false)}>
                  <ModuleItem child={child} index={index} />
                </RenderIf>
              </li>
            );
          }
          return filteredChildren;
        }, [])}
      </ul>
    </li>
  );
};

const ModuleItem = ({ child, index }: { child: (typeof DashboardNavigation)[0]["children"][0]; index: number }) => {
  const sidebarMode = useDashboardStore((state) => state.sidebarMode);
  const isMobile = useDashboardStore((state) => state.isMobile);
  const setSidebarMode = useDashboardStore((state) => state.setSidebarMode);
  const pathName = usePathname();

  const handleClick = useCallback(() => {
    if (isMobile) {
      setSidebarMode(SidebarModes.HIDDEN);
    }
  }, [isMobile, setSidebarMode]);

  const isActiveLink = sidebarMode === SidebarModes.OPEN && routeMatchesPatternActiveLink(child.href, pathName);

  return (
    <Link
      onClick={handleClick}
      href={child.href}
      className={cn(
        "p-ripple flex items-center cursor-pointer p-3 rounded-md hover:bg-primary hover:text-surface duration-300 transition-colors w-full",
        {
          "bg-primary text-surface": isActiveLink,
        }
      )}
    >
      {child.icon}
      {sidebarMode === SidebarModes.OPEN && <span className="font-medium ml-2">{child.title}</span>}
      <Ripple />
    </Link>
  );
};

const ModuleItemWithChildren = ({ child, index }: { child: (typeof DashboardNavigation)[0]["children"][2]; index: number }) => {
  const sidebarMode = useDashboardStore((state) => state.sidebarMode);
  const isMobile = useDashboardStore((state) => state.isMobile);
  const setSidebarMode = useDashboardStore((state) => state.setSidebarMode);
  const pathname = usePathname();
  const [isToggle, setIsToggle] = useState(() => true);

  const handleClick = useCallback(() => {
    setIsToggle((prevIsToggle) => !prevIsToggle);
  }, []);

  return (
    <>
      <div>
        <div
          onClick={handleClick}
          className="p-ripple p-3 flex rounded-md items-center transition-colors duration-150 justify-between w-full cursor-pointer font-bold"
        >
          {child.icon}
          {sidebarMode === SidebarModes.OPEN && <span className="font-medium ml-2">{child.title}</span>}
          <i className="pi pi-chevron-down ml-auto mr-1"></i>
          <Ripple />
        </div>
      </div>

      <ul
        className={cn("list-none py-0 pl-3 pr-0 m-0 overflow-y-hidden transition-all duration-300 ease-in-out", {
          "h-0": !isToggle,
          "h-auto": isToggle,
        })}
      >
        {child.children.map((child2, index) => (
          <li key={`${child2.href}-${index}`}>
            <Link
              onClick={() => {
                if (isMobile) {
                  setSidebarMode(SidebarModes.HIDDEN);
                }
              }}
              href={child2.href}
              className={cn(
                "p-ripple flex items-center cursor-pointer p-3 rounded-md hover:bg-primary hover:text-surface duration-150 transition-colors w-full",
                {
                  "bg-primary text-surface": sidebarMode === SidebarModes.OPEN && routeMatchesPatternActiveLink(child2.href, pathname),
                }
              )}
            >
              {child2.icon}
              {sidebarMode === SidebarModes.OPEN && <span className="font-medium ml-2">{child2.title}</span>}
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
  const isMobile = useDashboardStore((state) => state.isMobile);
  const setSidebarMode = useDashboardStore((state) => state.setSidebarMode);
  const setIsMobile = useDashboardStore((state) => state.setIsMobile);

  const handleMediaQueryChange = useCallback(
    (event: MediaQueryListEvent) => {
      if (event.matches) {
        setSidebarMode(SidebarModes.HIDDEN);
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    },
    [setIsMobile, setSidebarMode]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [handleMediaQueryChange]);

  const isOpen = sidebarMode === SidebarModes.OPEN;

  return (
    <>
      <PrimeSidebar
        autoFocus={false}
        dismissable={isMobile}
        className={cn({
          "bg-surface": true,
          "transition-all duration-300": true,
          "w-[18rem]": isOpen,
        })}
        modal={isMobile}
        appendTo={"self"}
        onHide={() => {
          setSidebarMode(SidebarModes.HIDDEN);
        }}
        visible={isOpen}
        content={({ closeIconRef, hide }) => (
          <>
            <div className="min-h-screen flex flex-col relative lg:static w-full">
              <div className="flex w-full justify-between p-3 items-center">
                <span className="font-bold text-xl">Menu</span>
                <Button type="button" autoFocus={false} ref={closeIconRef as any} onClick={(e) => hide(e)} text icon="pi pi-times" rounded />
              </div>
              <div className="overflow-y-auto w-full">
                {DashboardNavigation.map((item, index) => (
                  <ul className="list-none p-3 m-0" key={`${item.title}-${index}`}>
                    <Module item={item} index={index} />
                  </ul>
                ))}
              </div>
            </div>
          </>
        )}
      ></PrimeSidebar>

      <Button
        rounded
        text
        className="mr-auto"
        icon={"pi pi-bars"}
        onClick={() => {
          setSidebarMode(isOpen ? SidebarModes.HIDDEN : SidebarModes.OPEN);
        }}
      ></Button>
    </>
  );
}
