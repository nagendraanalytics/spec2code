import re
from typing import Dict, Tuple


def mask_spec(spec_text: str, identifiers: Dict[str, str]) -> Tuple[str, Dict[str, str]]:
    if not identifiers:
        return spec_text, {}

    masked_text = spec_text
    token_map: Dict[str, str] = {}

    for original in sorted(identifiers, key=len, reverse=True):
        placeholder = identifiers[original]
        pattern = re.compile(re.escape(original))
        masked_text = pattern.sub(placeholder, masked_text)
        token_map[placeholder] = original

    return masked_text, token_map


def unmask_code(generated_code: str, token_map: Dict[str, str]) -> str:
    if not token_map:
        return generated_code

    unmasked = generated_code
    for placeholder in sorted(token_map, key=len, reverse=True):
        original = token_map[placeholder]
        pattern = re.compile(re.escape(placeholder))
        unmasked = pattern.sub(original, unmasked)

    return unmasked


def validate_no_leakage(masked_text: str, identifiers: Dict[str, str]) -> list:
    leaked = [orig for orig in identifiers if orig and orig in masked_text]
    return leaked