'use client';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import type { ReactNode } from "react";
import { ScrollArea } from "./ui/scroll-area";

export function AiRecommendationsSheet({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="fixed bottom-6 right-6 z-50 p-0 h-auto hover:bg-transparent hover:scale-110 transition-transform"
        >
          <img
            src="http://protaquions.com.br/wp-content/uploads/2025/01/logo_Protaquions-2-scaled.png"
            alt="Protaquions"
            className="h-16 w-auto object-contain drop-shadow-xl"
          />
          <span className="sr-only">Open AI Recommendations</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-full sm:max-w-md p-0 border-l-primary/20">
        <ScrollArea className="h-full">
          {children}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
