"use client";

import { Sidebar as PrimeSidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { SidebarModes, useDashboardStore } from "../stores/dashboard-store";
import { cn } from "@/lib/utils/cn";
import { StyleClass } from "primereact/styleclass";
import { Ripple } from "primereact/ripple";
import { useEffect, useRef } from "react";
import RenderIf from "@/lib/utils/render-if";
import { DashboardNavigation } from "../(constants)/navigation/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routeMatchesPattern, routeMatchesPatternActiveLink } from "@/lib/utils/route-match-pattern";

const Module = ({ item, index }: { item: (typeof DashboardNavigation)[0]; index: number }) => {
  const moduleRef = useRef(null);
  const sidebarMode = useDashboardStore((state) => state.sidebarMode);

  return (
    <li>
      <StyleClass selector="@next" enterFromClassName="hidden" leaveToClassName="hidden" nodeRef={moduleRef}>
        <div ref={moduleRef} className="p-ripple px-3 py-1 flex items-center justify-between cursor-pointer font-bold">
          <RenderIf condition={sidebarMode == SidebarModes.OPEN}>
            <span className="font-bold">{item.title}</span>
          </RenderIf>
          <i className="pi pi-chevron-down"></i>
          <Ripple />
        </div>
      </StyleClass>
      <ul className="list-none p-0 m-0 overflow-hidden">
        {item.children
          .filter((item) => item?.renders != false)
          .map((child, index) => (
            <li className="mb-1" key={`${child.href}-${index}`}>
              <RenderIf condition={child.children.filter((child) => child?.renders != false).length == 0}>
                <ModuleItem child={child} index={index} />
              </RenderIf>
              <RenderIf condition={child.children.filter((child) => child?.renders != false).length > 0}>
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
  const isMobile = useDashboardStore((state) => state.isMobile);
  const setSidebarMode = useDashboardStore((state) => state.setSidebarMode);
  const pathName = usePathname();
  return (
    <Link
      onClick={() => {
        if (isMobile) {
          setSidebarMode(SidebarModes.HIDDEN);
        }
      }}
      href={child.href}
      className={cn(
        "p-ripple flex items-center cursor-pointer p-3 rounded-md hover:bg-primary hover:text-surface duration-300 transition-colors w-full",
        {
          "bg-primary text-surface": routeMatchesPatternActiveLink(child.href, pathName),
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
  const isMobile = useDashboardStore((state) => state.isMobile);
  const setSidebarMode = useDashboardStore((state) => state.setSidebarMode);
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
              onClick={() => {
                if (isMobile) {
                  setSidebarMode(SidebarModes.HIDDEN);
                }
              }}
              href={child2.href}
              className={cn(
                "p-ripple flex items-center cursor-pointer p-3 rounded-md hover:bg-primary hover:text-surface duration-150 transition-colors w-full",
                {
                  "bg-primary text-surface": routeMatchesPatternActiveLink(child2.href, pathname),
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
  const isMobile = useDashboardStore((state) => state.isMobile);
  const setSidebarMode = useDashboardStore((state) => state.setSidebarMode);
  const setIsMobile = useDashboardStore((state) => state.setIsMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (event: any) => {
      if (event.matches) {
        setSidebarMode(SidebarModes.HIDDEN);
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [setIsMobile, setSidebarMode]);

  return (
    <>
      <PrimeSidebar
        autoFocus={false}
        dismissable={isMobile ? true : false}
        className={cn({
          "bg-surface": true,
          "transition-all duration-300": true,
          "w-[18rem]": sidebarMode == SidebarModes.OPEN,
        })}
        modal={isMobile ? true : false}
        appendTo={"self"}
        onHide={() => {
          setSidebarMode(SidebarModes.HIDDEN);
        }}
        visible={sidebarMode != SidebarModes.HIDDEN}
        content={({ closeIconRef, hide }) => (
          <>
            <div className="min-h-screen flex flex-col relative lg:static w-full">
              <div className="flex w-full justify-between p-3 items-center">
                <span className="font-bold text-xl">Menu</span>

                <Button type="button" autoFocus={false} ref={closeIconRef as any} onClick={(e) => hide(e)} text icon="pi pi-times" rounded></Button>
                <Button
                  className="hidden"
                  type="button"
                  autoFocus={false}
                  ref={closeIconRef as any}
                  onClick={(e) => hide(e)}
                  text
                  icon="pi pi-times"
                  rounded
                ></Button>
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
