"""
Evidence deduplication and source independence validator.
"""

from typing import Any, Dict, List, Tuple


class Deduplicator:
    """Identifies duplicate evidence files and records to protect corroboration independence."""

    @staticmethod
    def are_duplicates(rec_a: Dict[str, Any], rec_b: Dict[str, Any]) -> Tuple[bool, str]:
        """
        Determines whether two evidence records represent identical duplicate copies.
        Returns: (is_duplicate, reason)
        """
        # 1. Exact hash match
        hash_a = rec_a.get("sha256") or rec_a.get("file_hash")
        hash_b = rec_b.get("sha256") or rec_b.get("file_hash")
        if hash_a and hash_b and hash_a == hash_b:
            return True, "Identical SHA-256 cryptographic hash."

        # 2. Duplicate file name / duplicate bank copy
        fn_a = str(rec_a.get("file_name", "")).lower()
        fn_b = str(rec_b.get("file_name", "")).lower()
        if "duplicate" in fn_a or "duplicate" in fn_b:
            base_a = fn_a.replace("duplicate_", "").replace("_duplicate", "")
            base_b = fn_b.replace("duplicate_", "").replace("_duplicate", "")
            if base_a == base_b:
                return True, "Duplicate export file naming detected."

        # 3. Identical raw text transcript
        text_a = str(rec_a.get("text", "")).strip()
        text_b = str(rec_b.get("text", "")).strip()
        if text_a and text_b and len(text_a) > 20 and text_a == text_b:
            return True, "Identical raw text transcript."

        return False, "Distinct records."
