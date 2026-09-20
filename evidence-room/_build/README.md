# Evidence Room — Product Build Notes

## Generate binaries

```bash
cd evidence-room
python3 _build/generate_spreadsheets.py
python3 _build/generate_docx.py
python3 _build/generate_pptx.py
python3 _build/generate_pdfs.py
```

## Preview website

```bash
cd evidence-room/08_WEBSITE
python3 -m http.server 8765
# open http://127.0.0.1:8765/
```

## Hierarchy

See `00_READ_ME/PRODUCT_INDEX.md` and `00_READ_ME/README.md`.
