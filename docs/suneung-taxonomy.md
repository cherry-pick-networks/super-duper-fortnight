---
description: Suneung subject taxonomy aligned to NRF core
---

# Suneung Subject Taxonomy

This document defines a subject taxonomy for the Korean CSAT (Suneung). The
model follows a single NRF-aligned core while keeping service logic modular at
the tool level. UI packages only toggle combinations of tools.

## 1. Design Principles
- Single NRF-aligned core taxonomy.
- Service logic is organized by learning tools, not by subject names.
- UI packages are just tool bundles (e.g., "English Package" is a bundle).

## 2. Taxonomy Shape (Core)
Use a small, stable set of identifiers that can be reused by any tool.

```json
{
  "meta": { "version": "v1.0", "source": "nrf_taxonomy_v1" },
  "taxonomy": {
    "exam": "suneung",
    "domain": "humanities",
    "field": "language",
    "track": "common",
    "subject_key": "korean",
    "subject_name": "Korean",
    "nrf": {
      "domain_name": "Humanities",
      "code": null
    }
  }
}
```

Recommended fields:
- `exam`: `suneung` (fixed for this catalog)
- `domain`: NRF top-level domain (e.g., `humanities`, `social_science`,
  `natural_science`, `engineering`, `medical`, `arts_physical`,
  `interdisciplinary`)
- `field`: subject family (e.g., `language`, `mathematics`, `history`)
- `track`: curriculum grouping (e.g., `common`, `elective`)
- `subject_key`: stable key used across services
- `subject_name`: display name
- `nrf.domain_name`: NRF-aligned domain name (display)
- `nrf.code`: optional NRF code if/when available

## 3. Suneung Subject Catalog (v1)
This list focuses on the stable subject set. Detailed sub-variants can be
extended later without changing the core shape.

### Common Core
- `korean` (domain: `humanities`, field: `language`)
- `mathematics` (domain: `natural_science`, field: `mathematics`)
- `english` (domain: `humanities`, field: `language`)
- `korean_history` (domain: `humanities`, field: `history`)

### Social Studies Electives
- `life_ethics` (domain: `social_science`, field: `ethics`)
- `ethics_thought` (domain: `social_science`, field: `ethics`)
- `korean_geography` (domain: `social_science`, field: `geography`)
- `world_geography` (domain: `social_science`, field: `geography`)
- `east_asian_history` (domain: `social_science`, field: `history`)
- `world_history` (domain: `social_science`, field: `history`)
- `law_politics` (domain: `social_science`, field: `politics`)
- `society_culture` (domain: `social_science`, field: `sociology`)
- `economics` (domain: `social_science`, field: `economics`)

### Science Electives
- `physics` (domain: `natural_science`, field: `physics`)
- `chemistry` (domain: `natural_science`, field: `chemistry`)
- `biology` (domain: `natural_science`, field: `biology`)
- `earth_science` (domain: `natural_science`, field: `earth_science`)

### Foreign Language / Classics
- `second_foreign_language` (domain: `humanities`, field: `language`)
- `classical_chinese` (domain: `humanities`, field: `language`)

### Vocational (Optional Extension)
If vocational electives are required, add a `field` family under
`interdisciplinary` or `engineering` with explicit subject keys.

## 4. NRF Domain Alignment (Name-Level)
Suneung subjects are aligned to NRF top-level domains by name. Codes can be
filled in later without changing the core shape.

| NRF Domain Key | NRF Domain Name |
| --- | --- |
| humanities | Humanities |
| social_science | Social Sciences |
| natural_science | Natural Sciences |
| engineering | Engineering |
| medical | Medical Sciences |
| arts_physical | Arts & Physical Education |
| interdisciplinary | Interdisciplinary |

## 5. Tool Packaging Example
Packages are only tool combinations. The taxonomy remains the same:

```json
{
  "package_key": "english_package",
  "tools": ["reading", "grammar", "phonology", "writing"],
  "subjects": ["english"]
}
```

## 6. Extension Rules
- Do not add new top-level domains without NRF alignment.
- Add new subjects by extending `subject_key` list only.
- Keep `subject_key` stable; change `subject_name` for UI only.
