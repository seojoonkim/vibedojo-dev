"use client";

import { useState } from "react";
import { getCharacterById, CHARACTERS, type Character } from "@/lib/characters";
import { CharacterSelectModal } from "@/components/character/character-select";
import { getBeltByXp } from "@/lib/belt-system";
import { Pencil } from "lucide-react";

interface CharacterDisplayProps {
  initialCharacterId: string;
  displayName: string;
  totalXp: number;
}

export function CharacterDisplay({ initialCharacterId, displayName, totalXp }: CharacterDisplayProps) {
  const [characterId, setCharacterId] = useState(initialCharacterId);
  const character = getCharacterById(characterId) || CHARACTERS[0];
  const belt = getBeltByXp(totalXp);

  const spriteSheet = `/images/characters/characters-${character.image}.png`;
  const bgPosX = (character.col / 3) * 100;
  const bgPosY = character.row * 100;

  const handleSelect = (newCharacter: Character) => {
    setCharacterId(newCharacter.id);
    // TODO: Save to database
  };

  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      {/* Large Character Avatar with Traditional Frame */}
      <CharacterSelectModal currentCharacterId={characterId} currentXp={totalXp} onSelect={handleSelect}>
        <button className="group relative mb-5">
          {/* Outer glow effect */}
          <div className="absolute -inset-2 bg-stone-400/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Traditional frame */}
          <div className="relative">
            <div
              className="w-28 sm:w-36 h-28 sm:h-36 overflow-hidden transition-all duration-300 group-hover:scale-105 border border-stone-300 group-hover:border-stone-400 rounded-sm shadow-md group-hover:shadow-lg"
              style={{
                backgroundImage: `url(${spriteSheet})`,
                backgroundSize: "400% 200%",
                backgroundPosition: `${bgPosX}% ${bgPosY}%`,
              }}
            />

            {/* Belt indicator */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-2.5 sm:h-3 w-16 sm:w-20 rounded-sm border border-stone-300"
              style={{
                backgroundColor: belt.color,
              }}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-800/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 rounded-sm">
              <span className="text-xs text-white uppercase tracking-wider font-medium">변경</span>
            </div>
          </div>

          {/* Edit button */}
          <div className="absolute -bottom-1 -right-1 w-7 sm:w-8 h-7 sm:h-8 bg-stone-700 flex items-center justify-center border border-stone-500 rounded-sm shadow-md">
            <Pencil className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-white" />
          </div>
        </button>
      </CharacterSelectModal>

      {/* Character Info */}
      <div className="w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-800 mb-2">
          {displayName}
        </h1>
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-sm sm:text-base text-stone-600 font-medium">{character.nameKo}</span>
          <span className="text-stone-400">|</span>
          <div className="flex items-center gap-2">
            <div
              className="w-3.5 sm:w-4 h-2 sm:h-2.5 rounded-sm border border-stone-300"
              style={{
                backgroundColor: belt.color,
              }}
            />
            <span className="text-sm sm:text-base text-stone-600 font-medium">{belt.nameKo} {belt.rank}</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-stone-500">{character.description}</p>
      </div>
    </div>
  );
}
