/*
Language: RGBASM
Author: Eldred Habert <me@eldred.fr>
Description: RGBDS assembly language definition
Website: https://rgbds.gbdev.io
*/
export default function(hljs) {
  const INTERPOLATION_MODE =  {
    className: 'subst',
    begin: /\{/,
    end: /\}/,
    contains: [
      {
        className: 'variable',
        variants: [
          { match: /[a-z_][a-z0-9_#@]*/ },
          { match: /(?:[a-z_][a-z0-9_#@]*)?\.[a-z0-9_#@]*/ },
        ],
        // Interpolationss may only contain:
        // - Symbol names
        // - Macro args (args are [1-9@#], contained in symbol names)
        // - Closing braces
        // - Format specs (fmts are [duxXbofs], contained in symbol names)
      },
    ],
    illegal: /[^a-z0-9_@#.\\}+ -]/,
  };

  let BLOCK_COMMENT_MODE = hljs.COMMENT(/\/\*/, /\*\//);
  BLOCK_COMMENT_MODE.relevance = 0;

  return {
    name: "RGBASM",
    case_insensitive: true,
    aliases: ["rgbds", "gbasm", "gbz80"],
    keywords: {
      $pattern: /[a-z_][a-z0-9_#@]*/,
      keyword:
        'adc add and bit call ccf cpl cp daa dec di ei halt inc jp jr ld ldi ldd ldio ldh nop or pop push res reti ret rlca rlc rla rl rrc rrca rra rr rst sbc scf set sla sra srl stop sub swap xor ' + // Instructions
        'def bank align round ceil floor div mul sin cos tan asin acos atan atan2 pow log high low isconst sizeof startof strcmp strin strsub strlen strcat strupr strlwr strrin strrpl strfmt ' + // Functions
        'include print println printt printi printv printf export ds|0 db|0 dw|0 dl|0 section purge rsreset rsset incbin|10 charmap|10 newcharmap|10 setcharmap|10 fail warn fatal assert static_assert shift opt break ' + // Pseudo-ops
        'macro endm rept for endr load endl pushc popc union nextu endu pushs pops pusho popo ' + // Block delimiters
        'if|0 else|0 elif|0 endc|0 ' + // Conditionals
        'rb rw equ equs redef', // Variable definitions (`set` and `rl` are in the instruction list)
      literal: ['_NARG', '_RS', '__LINE__', '__FILE__', '__DATE__', '__TIME__', '__ISO_8601_LOCAL__', '__ISO_8601_UTC__', '__UTC_YEAR__', '__UTC_MONTH__', '__UTC_DAY__', '__UTC_HOUR__', '__UTC_MINUTE__', '__UTC_SECOND__', '__RGBDS_MAJOR__', '__RGBDS_MINOR__', '__RGBDS_PATCH__', '__RGBDS_VERSION__'],
      // `hardware.inc` symbols are not special, but very common
      _hardware_inc: '_VRAM _VRAM8000 _VRAM8800 _VRAM9000 _SCRN0 _SCRN1 _SRAM _RAM _RAMBANK _OAMRAM _IO _AUD3WAVERAM _HRAM rRAMG rROMB0 rROMB1 rRAMB rP1 P1F_5 P1F_4 P1F_3 P1F_2 P1F_1 P1F_0 P1F_GET_DPAD P1F_GET_BTN P1F_GET_NONE rSB rSC rDIV rTIMA rTMA rTAC TACF_START TACF_STOP TACF_4KHZ TACF_16KHZ TACF_65KHZ TACF_262KHZ rIF rNR10 rAUD1SWEEP AUD1SWEEP_UP AUD1SWEEP_DOWN rNR11 rAUD1LEN rNR12 rAUD1ENV rNR13 rAUD1LOW rNR14 rAUD1HIGH rNR21 rAUD2LEN rNR22 rAUD2ENV rNR23 rAUD2LOW rNR24 rAUD2HIGH rNR30 rAUD3ENA rNR31 rAUD3LEN rNR32 rAUD3LEVEL rNR33 rAUD3LOW rNR34 rAUD3HIGH rNR41 rAUD4LEN rNR42 rAUD4ENV rNR43 rAUD4POLY rNR44 rAUD4GO rNR50 rAUDVOL AUDVOL_VIN_LEFT AUDVOL_VIN_RIGHT rNR51 rAUDTERM AUDTERM_4_LEFT AUDTERM_3_LEFT AUDTERM_2_LEFT AUDTERM_1_LEFT AUDTERM_4_RIGHT AUDTERM_3_RIGHT AUDTERM_2_RIGHT AUDTERM_1_RIGHT rNR52 rAUDENA AUDENA_ON AUDENA_OFF rLCDC LCDCF_OFF LCDCF_ON LCDCF_WIN9800 LCDCF_WIN9C00 LCDCF_WINOFF LCDCF_WINON LCDCF_BG8800 LCDCF_BG8000 LCDCF_BG9800 LCDCF_BG9C00 LCDCF_OBJ8 LCDCF_OBJ16 LCDCF_OBJOFF LCDCF_OBJON LCDCF_BGOFF LCDCF_BGON rSTAT STATF_LYC STATF_MODE10 STATF_MODE01 STATF_MODE00 STATF_LYCF STATF_HBL STATF_VBL STATF_OAM STATF_LCD STATF_BUSY rSCY rSCX rLY rLYC rDMA rBGP rOBP0 rOBP1 rWY rWX rKEY1 rSPD KEY1F_DBLSPEED KEY1F_PREPARE rVBK rHDMA1 rHDMA2 rHDMA3 rHDMA4 rHDMA5 HDMA5F_MODE_GP HDMA5F_MODE_HBL HDMA5F_BUSY rRP RPF_ENREAD RPF_DATAIN RPF_WRITE_HI RPF_WRITE_LO rBCPS BCPSF_AUTOINC rBCPD rOCPS OCPSF_AUTOINC rOCPD rSVBK rSMBK rPCM12 rPCM34 rIE IEF_HILO IEF_SERIAL IEF_TIMER IEF_STAT IEF_VBLANK AUDLEN_DUTY_12_5 AUDLEN_DUTY_25 AUDLEN_DUTY_50 AUDLEN_DUTY_75 AUDENV_UP AUDENV_DOWN AUDHIGH_RESTART AUDHIGH_LENGTH_ON AUDHIGH_LENGTH_OFF BOOTUP_A_DMG BOOTUP_A_CGB BOOTUP_A_MGB BOOTUP_B_CGB BOOTUP_B_AGB CART_COMPATIBLE_DMG CART_COMPATIBLE_DMG_GBC CART_COMPATIBLE_GBC CART_INDICATOR_GB CART_INDICATOR_SGB CART_ROM CART_ROM_MBC1 CART_ROM_MBC1_RAM CART_ROM_MBC1_RAM_BAT CART_ROM_MBC2 CART_ROM_MBC2_BAT CART_ROM_RAM CART_ROM_RAM_BAT CART_ROM_MMM01 CART_ROM_MMM01_RAM CART_ROM_MMM01_RAM_BAT CART_ROM_MBC3_BAT_RTC CART_ROM_MBC3_RAM_BAT_RTC CART_ROM_MBC3 CART_ROM_MBC3_RAM CART_ROM_MBC3_RAM_BAT CART_ROM_MBC5 CART_ROM_MBC5_BAT CART_ROM_MBC5_RAM_BAT CART_ROM_MBC5_RUMBLE CART_ROM_MBC5_RAM_RUMBLE CART_ROM_MBC5_RAM_BAT_RUMBLE CART_ROM_MBC7_RAM_BAT_GYRO CART_ROM_POCKET_CAMERA CART_ROM_BANDAI_TAMA5 CART_ROM_HUDSON_HUC3 CART_ROM_HUDSON_HUC1 CART_ROM_32KB CART_ROM_64KB CART_ROM_128KB CART_ROM_256KB CART_ROM_512KB CART_ROM_1024KB CART_ROM_2048KB CART_ROM_4096KB CART_ROM_8192KB CART_ROM_1152KB CART_ROM_1280KB CART_ROM_1536KB CART_SRAM_NONE CART_SRAM_2KB CART_SRAM_8KB CART_SRAM_32KB CART_SRAM_128KB CART_SRAM_ENABLE CART_SRAM_DISABLE CART_DEST_JAPANESE CART_DEST_NON_JAPANESE PADF_DOWN PADF_UP PADF_LEFT PADF_RIGHT PADF_START PADF_SELECT PADF_B PADF_A PADB_DOWN PADB_UP PADB_LEFT PADB_RIGHT PADB_START PADB_SELECT PADB_B PADB_A SCRN_X SCRN_Y SCRN_X_B SCRN_Y_B SCRN_VX SCRN_VY SCRN_VX_B SCRN_VY_B OAMA_Y OAMA_X OAMA_TILEID OAMA_FLAGS sizeof_OAM_ATTRS OAM_COUNT OAMF_PRI OAMF_YFLIP OAMF_XFLIP OAMF_PAL0 OAMF_PAL1 OAMF_BANK0 OAMF_BANK1 OAMF_PALMASK OAMB_PRI OAMB_YFLIP OAMB_XFLIP OAMB_PAL1 OAMB_BANK1 IEF_LCDC',
  },
    contains: [
      hljs.COMMENT(/;/, /$/),
      BLOCK_COMMENT_MODE,

      INTERPOLATION_MODE,

      {
        className: 'number',
        variants: [
          { match: /\$[0-9-af]+/ }, // Hexadecimal
          { match: /\b[0-9]+(\.[0-9]+)?/, relevance: 0 }, // Decimal (potentially fixed-point)
          { match: /&[0-7]+/ }, // Octal
          { match: /%[01]+/ }, // Binary
          { match: /`[0-3]+/ }, // Gfx
        ]
      },

      {
        className: 'operator',
        match: /\*\*|~|\+|-|\*|\/|%|<<|>>|&|\||\^|!=|==|<=|>=|<|>|&&|\|\||!/,
        relevance: 0,
      },

      {
        className: 'punctuation',
        match: /[,[\]:]/,
        relevance: 0,
      },

      {
        className: 'string',
        begin: /"/,
        end: /"/,
        contains: [
          INTERPOLATION_MODE
        ],
        relevance: 0,
      },

      // Label definition
      {
        className: 'symbol',
        variants: [
          { match: /^[ \t]*[a-z_][a-z0-9_#@]*(?=:)/ },
          { match: /^[ \t]*(?:[a-z_][a-z0-9_#@]*)?\.[a-z0-9_#@]+(?![a-z0-9_#@])/ },
        ],
        relevance: 0,
      },

      // Section types
      {
        className: 'type',
        match: /\b(?:wram0|vram|romx|rom0|hram|wramx|sram|oam)(?![a-z0-9_#@])/,
      },

      // Registers & conditions
      {
        className: 'variable',
        match: /\b(?:af|bc|de|hl|hli|hld|a|b|c|d|e|h|l|nz|z|nc)(?![a-z0-9_#@])/,
        relevance: 0,
      },
    ],

    // These help not auto-detecting the wrong language
    illegal: [
      /\.[a-z0-9_#@]*\./, // Only one dot per local label name
      /\.[0-9]*\./, // Only one dot per number
      // At the beginning of a line, we can only have:
      // - spaces,
      // - a newline (if the line is empty),
      // - an ident/keyword (thus, its starting character),
      // - an anon label decl (:),
      // - a comment
      /^[ \t]*[^ \t\r\na-z_:;]/,
    ]
  }
}
