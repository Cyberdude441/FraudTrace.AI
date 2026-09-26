"""
Metadata and integrity extractor for file-level evidence inspection.
"""

import hashlib
from pathlib import Path
from typing import Any, Dict, Optional


class MetadataExtractor:
    """Computes hashes and inspects file-level metadata."""

    @staticmethod
    def compute_sha256(file_path: Path) -> Optional[str]:
        """Calculates SHA-256 hash of a file."""
        if not file_path.exists() or not file_path.is_file():
            return None
        h = hashlib.sha256()
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(65536), b""):
                h.update(chunk)
        return h.hexdigest()

    @staticmethod
    def extract_file_info(file_path: Path) -> Dict[str, Any]:
        """Extracts file size, extension, and integrity hash."""
        if not file_path.exists():
            return {"exists": False}
        return {
            "exists": True,
            "filename": file_path.name,
            "size_bytes": file_path.stat().st_size,
            "extension": file_path.suffix.lower(),
            "sha256": MetadataExtractor.compute_sha256(file_path)
        }
