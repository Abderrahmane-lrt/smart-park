"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Globe } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { languages, type Language } from "@/lib/i18n"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const currentLang = languages[language]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 hover:bg-transparent">
          <span className="text-lg">{currentLang.flag}</span>
          <span className="hidden sm:inline text-blue-600 font-medium">{currentLang.name}</span>
          <Globe className="h-4 w-4 sm:hidden text-blue-600" />
          <ChevronDown className="h-3 w-3 text-blue-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px] border-blue-200">
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as Language)}
            className={`flex items-center gap-3 hover:bg-transparent ${
              language === code ? "bg-blue-50 text-blue-700" : "text-blue-600"
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {language === code && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
