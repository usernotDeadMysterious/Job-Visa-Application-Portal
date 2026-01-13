// JobSearchPanel.tsx
import React, { useMemo, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sliders, ChevronDown, ChevronUp } from "lucide-react";

export type JobSearchPayload = {
  q: string;
  country?: string;
  city?: string;
  prefs?: string[];
  position?: string;
  industry?: string;
};

type Props = {
  onSearch?: (p: JobSearchPayload) => void;
  countries?: string[];
  cities?: string[];
  prefs?: string[];
  position?: string[];
  industry?: string[];
};

export default function JobSearchPanel({
  onSearch,
  countries: countryList = [
    "Pakistan",
    "United States",
    "United Kingdom",
    "India",
    "Canada",
    "Australia",
  ],
  cities: cityList = [
    "Islamabad",
    "Karachi",
    "Lahore",
    "New York",
    "London",
    "Toronto",
  ],
  position: positionList = [
    "Front-End Developer",
    "Back-End Developer",
    "Full-Stack Developer",
  ],
  industry: industryList = ["Development", "Design", "Information Technology"],
  prefs: prefList = ["remote", "onsite", "hybrid"],
}: Props) {
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [countryFocused, setCountryFocused] = useState(false);
  const [cityFocused, setCityFocused] = useState(false);
  const [industryFocused, setIndustryFocused] = useState(false);
  const [positionFocused, setPositionFocused] = useState(false);
  // main form state
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [position, setPosition] = useState("");
  const [industry, setIndustry] = useState("");
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);

  const filteredCountries = useMemo(
    () =>
      countryList.filter((c) =>
        c.toLowerCase().includes(country.toLowerCase())
      ),
    [country, countryList]
  );

  const filteredCities = useMemo(
    () => cityList.filter((c) => c.toLowerCase().includes(city.toLowerCase())),
    [city, cityList]
  );
  const filteredPosition = useMemo(
    () =>
      (positionList || []).filter((p) =>
        p.toLowerCase().includes(position.toLowerCase())
      ),
    [position, positionList]
  );

  const filteredIndustry = useMemo(
    () =>
      (industryList || []).filter((i) =>
        i.toLowerCase().includes(industry.toLowerCase())
      ),
    [industry, industryList]
  );

  function togglePref(p: string) {
    setSelectedPrefs((s) =>
      s.includes(p) ? s.filter((x) => x !== p) : [...s, p]
    );
  }

  function submitSearchAndClose() {
    const payload: JobSearchPayload = {
      q: q.trim(),
      country: country.trim() || undefined,
      city: city.trim() || undefined,
      prefs: selectedPrefs.length ? selectedPrefs : undefined,
      position: position.trim() || undefined,
      industry: industry.trim() || undefined,
    };
    onSearch?.(payload);
    setFilterOpen(false);
    setOpen(false);
  }

  function onKeyDownMain(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitSearchAndClose();
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open search"
          className="p-2 rounded-md hover:bg-slate-600/70 focus:outline-none"
        >
          <Search className=" text-indigo-300 w-5 h-5" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="
  max-w-3xl mx-auto p-6 rounded-xl shadow-2xl
  bg-black/70 backdrop-blur-xl
  ring-1 ring-cyan-500/20
  text-slate-100
"
      >
        <div className="flex items-center flex-col justify-center gap-2 mb-4">
          {/* Search Icon and Text  */}
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-200" />
            <h3
              className="
  flex items-center gap-2 px-4 py-1.5 rounded-full
  border border-cyan-400/30
  bg-cyan-500/10
  text-cyan-300
  hover:bg-cyan-500/20
  transition
"
            >
              Search jobs
            </h3>
          </div>
          {/* Filter Div  */}
          <div className="flex items-center gap-2 text-slate-200">
            <button
              title="Filters"
              onClick={() => setFilterOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30  bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition"
              aria-expanded={filterOpen}
            >
              <Sliders className="w-4 h-4" />
              <span className="text-sm ">Filters</span>
              {filterOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Inline collapsible filter panel (appears above the main search input) */}

        {/* filters Panel/Sheet */}
        <div
          className={`mb-4 overflow-hidden transition-all duration-200 ${
            filterOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!filterOpen}
        >
          <div
            className="
  p-4 rounded-xl
  bg-slate-900/80
  border border-slate-700
"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Country combobox-like */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Country
                </label>
                <div className="relative">
                  <Input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    onFocus={() => setCountryFocused(true)}
                    onBlur={() => setCountryFocused(false)}
                    placeholder="Type or pick a country"
                    className="
  bg-slate-950/80
  border border-slate-700
  text-slate-100
  placeholder:text-slate-500
  focus:border-cyan-400
  focus:ring-cyan-400/30
"
                  />
                  {countryFocused &&
                    country.length > 0 &&
                    filteredCountries.length > 0 && (
                      <ul
                        className="
  absolute z-40 left-0 right-0 mt-1 max-h-40 overflow-auto rounded-lg
  bg-slate-950
  border border-slate-700
  shadow-xl
"
                      >
                        {filteredCountries.map((c) => (
                          <li
                            key={c}
                            className="
  px-3 py-2 cursor-pointer text-sm
  text-slate-200
  hover:bg-cyan-500/10
"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setCountry(c);
                              setCountryFocused(false);
                            }}
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              </div>

              {/* City combobox-like */}
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <div className="relative">
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onFocus={() => setCityFocused(true)}
                    onBlur={() => setCityFocused(false)}
                    placeholder="Type or pick a city"
                    className="
  bg-slate-950/80
  border border-slate-700
  text-slate-100
  placeholder:text-slate-500
  focus:border-cyan-400
  focus:ring-cyan-400/30
"
                  />
                  {cityFocused &&
                    city.length > 0 &&
                    filteredCities.length > 0 && (
                      <ul
                        className="
  absolute z-40 left-0 right-0 mt-1 max-h-40 overflow-auto rounded-lg
  bg-slate-950
  border border-slate-700
  shadow-xl
"
                      >
                        {filteredCities.map((c) => (
                          <li
                            key={c}
                            className="
  px-3 py-2 cursor-pointer text-sm
  text-slate-200
  hover:bg-cyan-500/10
"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setCity(c);
                              setCityFocused(false);
                            }}
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              </div>

              {/* Preferences chips */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Preferences
                </label>
                <div className="flex flex-wrap gap-2">
                  {prefList.map((p) => {
                    const active = selectedPrefs.includes(p);
                    return (
                      <button
                        key={p}
                        onClick={() => togglePref(p)}
                        className={`px-3 py-1 rounded-full text-sm border ${
                          active
                            ? "bg-cyan-500/20 text-cyan-300  border-transparent"
                            : "bg-slate-900 text-slate-300 border-slate-700 hover:border-cyan-400/40"
                        }`}
                        aria-pressed={active}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Position Preference */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Positon
                </label>
                <div className="relative">
                  <Input
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    onFocus={() => setPositionFocused(true)}
                    onBlur={() => setPositionFocused(false)}
                    placeholder="Type or pick a position"
                    className="bg-slate-950/80 border border-slate-700 text-slate-100 placeholder:text-slate-500focus:border-cyan-400 focus:ring-cyan-400/30"
                  />

                  {positionFocused &&
                    position.length > 0 &&
                    filteredPosition.length > 0 && (
                      <ul
                        className="
  absolute z-40 left-0 right-0 mt-1 max-h-40 overflow-auto rounded-lg
  bg-slate-950
  border border-slate-700
  shadow-xl
"
                      >
                        {filteredPosition.map((p) => (
                          <li
                            key={p}
                            className="
  px-3 py-2 cursor-pointer text-sm
  text-slate-200
  hover:bg-cyan-500/10
"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setPosition(p);
                              setPositionFocused(false);
                            }}
                          >
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              </div>
              {/* Industry Preference */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Industry
                </label>
                <div className="relative">
                  <Input
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    onFocus={() => setIndustryFocused(true)}
                    onBlur={() => setIndustryFocused(false)}
                    placeholder="Type or pick an industry"
                    className="
  bg-slate-950/80
  border border-slate-700
  text-slate-100
  placeholder:text-slate-500
  focus:border-cyan-400
  focus:ring-cyan-400/30
"
                  />

                  {industryFocused &&
                    industry.length > 0 &&
                    filteredIndustry.length > 0 && (
                      <ul
                        className="
  absolute z-40 left-0 right-0 mt-1 max-h-40 overflow-auto rounded-lg
  bg-slate-950
  border border-slate-700
  shadow-xl
"
                      >
                        {filteredIndustry.map((i) => (
                          <li
                            key={i}
                            className="
  px-3 py-2 cursor-pointer text-sm
  text-slate-200
  hover:bg-cyan-500/10
"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setIndustry(i);
                              setIndustryFocused(false);
                            }}
                          >
                            {i}
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setCountry("");
                    setCity("");
                    setSelectedPrefs([]);
                  }}
                >
                  Clear
                </Button>
                <Button onClick={() => setFilterOpen(false)}>Done</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main search input */}
        <div className="mb-4">
          <label className="sr-only">Search jobs</label>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDownMain}
            placeholder="Job title, keyword, company, city, zip (e.g. 'frontend', 'pakistan', '24710', 'remote')"
            className="
  bg-slate-950/80
  border border-slate-700
  text-slate-100
  placeholder:text-slate-500
  focus:border-cyan-400
  focus:ring-cyan-400/30
"
          />
        </div>

        {/* Active filters summary */}
        <div className="mb-4 flex flex-wrap gap-2 items-center ">
          {country ? (
            <div
              className="px-2 py-1 rounded-full bg-slate-900 text-slate-200 border border-slate-700
 text-sm"
            >
              Country: {country}
            </div>
          ) : null}
          {city ? (
            <div className="px-2 py-1 rounded-full bg-slate-900 text-slate-200 border border-slate-700 text-sm">
              City: {city}
            </div>
          ) : null}
          {position ? (
            <div className="px-2 py-1 rounded-full bg-slate-900 text-slate-200 border border-slate-700  text-sm">
              Position: {position}
            </div>
          ) : null}
          {industry ? (
            <div className="px-2 py-1 rounded-full bg-slate-900 text-slate-200 border border-slate-700 text-sm">
              Industry: {industry}
            </div>
          ) : null}
          {selectedPrefs.map((p) => (
            <div
              key={p}
              className="px-2 py-1 rounded-full bg-slate-900 text-slate-200 border border-slate-700 text-sm"
            >
              {p}
            </div>
          ))}
          {!country && !city && selectedPrefs.length === 0 && (
            <div className="text-xs text-slate-500">No filters active</div>
          )}
        </div>

        <div className="flex justify-center flex-col gap-1 text-slate-200">
          <Button
            variant="ghost"
            className="text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={() => {
              setOpen(false);
              setFilterOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className="
    bg-linear-to-r from-cyan-500 to-blue-600
    text-black font-semibold
    hover:opacity-90"
            onClick={submitSearchAndClose}
          >
            Search
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
