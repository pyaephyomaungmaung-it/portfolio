import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def build_general_cv():
    doc = docx.Document()
    
    # Page setup - 0.75 inch margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.6)
        section.bottom_margin = Inches(0.6)
        section.left_margin = Inches(0.7)
        section.right_margin = Inches(0.7)
        
    # Color palette
    PRIMARY_COLOR = RGBColor(26, 54, 93)   # Deep Navy
    SECONDARY_COLOR = RGBColor(43, 108, 176) # Slate Blue
    TEXT_COLOR = RGBColor(45, 55, 72)     # Charcoal / Dark Gray
    LIGHT_BG = "F7FAFC"
    
    # Normal style font setting
    style_normal = doc.styles['Normal']
    font = style_normal.font
    font.name = 'Arial'
    font.size = Pt(10)
    font.color.rgb = TEXT_COLOR

    def add_heading_1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.name = 'Arial'
        run.font.size = Pt(12)
        run.font.bold = True
        run.font.color.rgb = PRIMARY_COLOR
        
        # Add bottom border under section heading
        pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="8" w:space="2" w:color="2B6CB0"/></w:pBdr>')
        p._p.get_or_add_pPr().append(pBdr)
        return p

    # --- HEADER ---
    header_p = doc.add_paragraph()
    header_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    header_p.paragraph_format.space_after = Pt(2)
    
    name_run = header_p.add_run("PYAE PHYO MAUNG MAUNG\n")
    name_run.font.name = 'Arial'
    name_run.font.size = Pt(20)
    name_run.font.bold = True
    name_run.font.color.rgb = PRIMARY_COLOR
    
    contact_p = doc.add_paragraph()
    contact_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    contact_p.paragraph_format.space_after = Pt(4)
    c_run = contact_p.add_run("Singapore  |  +65 80787476  |  pyaephyomm191@gmail.com\n")
    c_run.font.size = Pt(9.5)
    c_run.font.color.rgb = SECONDARY_COLOR
    
    c_run2 = contact_p.add_run("Languages: English (Fluent), Burmese (Native), Mandarin (Conversational)\nAvailability: Immediate  |  Flexible Shifts (Weekends, Night Shifts, Public Holidays)")
    c_run2.font.size = Pt(9.5)
    c_run2.font.italic = True
    c_run2.font.color.rgb = TEXT_COLOR

    # --- PROFESSIONAL SUMMARY ---
    add_heading_1("PROFESSIONAL SUMMARY")
    sum_p = doc.add_paragraph()
    sum_p.paragraph_format.space_after = Pt(6)
    sum_p.paragraph_format.line_spacing = 1.15
    sum_p.add_run(
        "Dependable, energetic, and hardworking professional seeking general work opportunities in "
    )
    r1 = sum_p.add_run("Sales & Retail Assistance, Driving & Delivery Logistics, ")
    r1.font.bold = True
    sum_p.add_run("and ")
    r2 = sum_p.add_run("Kitchen & F&B Support. ")
    r2.font.bold = True
    sum_p.add_run(
        "Combines strong customer service abilities, hands-on inventory management experience, physical stamina, and a quick-learning mindset. Proven track record managing store retail operations, safe vehicle driving/transport, stock handling, and assisting team operations in fast-paced environments. Dedicated to maintaining high standards of punctuality, safety, hygiene, and customer satisfaction."
    )

    # --- KEY SKILLS & COMPETENCIES ---
    add_heading_1("KEY SKILLS & COMPETENCIES")
    
    # Category 1: Sales
    cat1_p = doc.add_paragraph()
    cat1_p.paragraph_format.space_before = Pt(4)
    cat1_p.paragraph_format.space_after = Pt(2)
    run_cat1 = cat1_p.add_run("🛒 Sales & Retail Operations")
    run_cat1.font.bold = True
    run_cat1.font.size = Pt(10.5)
    run_cat1.font.color.rgb = SECONDARY_COLOR

    bullets_sales = [
        ("Customer Engagement & Support: ", "Warmly welcoming customers, identifying needs, making product recommendations, and handling inquiries with a friendly demeanor."),
        ("POS & Cashiering: ", "Proficient in operating Point-of-Sale (POS) systems, cash registers, invoice issuing, and accurate cash reconciliation."),
        ("Inventory & Merchandising: ", "Restocking retail shelves, product tagging, stock auditing, unboxing incoming goods, and setting up attractive store displays.")
    ]
    for bold_txt, norm_txt in bullets_sales:
        bp = doc.add_paragraph(style='List Bullet')
        bp.paragraph_format.space_after = Pt(2)
        bp.paragraph_format.line_spacing = 1.1
        r_b = bp.add_run(bold_txt)
        r_b.font.bold = True
        bp.add_run(norm_txt)

    # Category 2: Driving
    cat2_p = doc.add_paragraph()
    cat2_p.paragraph_format.space_before = Pt(6)
    cat2_p.paragraph_format.space_after = Pt(2)
    run_cat2 = cat2_p.add_run("🚗 Driving & Delivery Logistics")
    run_cat2.font.bold = True
    run_cat2.font.size = Pt(10.5)
    run_cat2.font.color.rgb = SECONDARY_COLOR

    bullets_driving = [
        ("Safe Driving & Road Navigation: ", "Experienced driver with strong knowledge of road safety regulations, GPS route planning, and time-conscious dispatches."),
        ("Cargo Handling & Loading: ", "Careful loading, securing, and unloading of items to ensure 100% damage-free delivery to customers or clients."),
        ("Vehicle Care & Discipline: ", "Performing routine vehicle inspection checks, maintaining cleanliness, and strictly following schedule dispatches.")
    ]
    for bold_txt, norm_txt in bullets_driving:
        bp = doc.add_paragraph(style='List Bullet')
        bp.paragraph_format.space_after = Pt(2)
        bp.paragraph_format.line_spacing = 1.1
        r_b = bp.add_run(bold_txt)
        r_b.font.bold = True
        bp.add_run(norm_txt)

    # Category 3: Kitchen
    cat3_p = doc.add_paragraph()
    cat3_p.paragraph_format.space_before = Pt(6)
    cat3_p.paragraph_format.space_after = Pt(2)
    run_cat3 = cat3_p.add_run("🍳 Kitchen & F&B Support")
    run_cat3.font.bold = True
    run_cat3.font.size = Pt(10.5)
    run_cat3.font.color.rgb = SECONDARY_COLOR

    bullets_kitchen = [
        ("Food Preparation: ", "Assisting kitchen staff and chefs with basic food prep, ingredient washing, chopping, portioning, and packing."),
        ("Hygiene & Sanitization: ", "Operating commercial dishwashers, scrubbing cookware, maintaining clean workstations, and abiding by food safety standards."),
        ("Fast-Paced Operations: ", "Working quickly and systematically during peak lunch/dinner rush hours to ensure seamless front-and-back of house workflow.")
    ]
    for bold_txt, norm_txt in bullets_kitchen:
        bp = doc.add_paragraph(style='List Bullet')
        bp.paragraph_format.space_after = Pt(2)
        bp.paragraph_format.line_spacing = 1.1
        r_b = bp.add_run(bold_txt)
        r_b.font.bold = True
        bp.add_run(norm_txt)

    # --- WORK EXPERIENCE ---
    add_heading_1("WORK EXPERIENCE")

    # Job 1
    j1_p = doc.add_paragraph()
    j1_p.paragraph_format.space_before = Pt(4)
    j1_p.paragraph_format.space_after = Pt(1)
    
    r_j1 = j1_p.add_run("Sales Operations & Retail Lead")
    r_j1.font.bold = True
    r_j1.font.size = Pt(10.5)
    r_j1.font.color.rgb = PRIMARY_COLOR
    
    r_comp = j1_p.add_run("  |  Tike War Myanmar")
    r_comp.font.bold = True
    
    r_date = j1_p.add_run("\tAug 2020 – Sep 2023")
    r_date.font.italic = True

    bullets_j1 = [
        "Supervised daily retail store operations, stock inventory, and warehouse storage for retail goods and mechanical components.",
        "Operated POS cash registers, handled cash/card transactions, assisted walk-in customers, and resolved inquiries cheerfully.",
        "Received, unboxed, inspected, and logged incoming stock shipments; ensured store shelf displays remained well-stocked.",
        "Executed local delivery dispatches to business partners and retail clients safely and on schedule.",
        "Maintained store hygiene, organized stockroom storage, and upheld high standards of safety and customer care."
    ]
    for b in bullets_j1:
        bp = doc.add_paragraph(style='List Bullet')
        bp.paragraph_format.space_after = Pt(2)
        bp.paragraph_format.line_spacing = 1.1
        bp.add_run(b)

    # Job 2
    j2_p = doc.add_paragraph()
    j2_p.paragraph_format.space_before = Pt(6)
    j2_p.paragraph_format.space_after = Pt(1)
    
    r_j2 = j2_p.add_run("Operations & Team Lead")
    r_j2.font.bold = True
    r_j2.font.size = Pt(10.5)
    r_j2.font.color.rgb = PRIMARY_COLOR
    
    r_comp2 = j2_p.add_run("  |  Strategy First Project Team")
    r_comp2.font.bold = True
    
    r_date2 = j2_p.add_run("\tMar 2024 – Jun 2024")
    r_date2.font.italic = True

    bullets_j2 = [
        "Coordinated task schedules, member duties, and daily workflow in a structured team environment.",
        "Demonstrated strong problem-solving, active communication, and reliability under tight timelines."
    ]
    for b in bullets_j2:
        bp = doc.add_paragraph(style='List Bullet')
        bp.paragraph_format.space_after = Pt(2)
        bp.paragraph_format.line_spacing = 1.1
        bp.add_run(b)

    # --- EDUCATION ---
    add_heading_1("EDUCATION & QUALIFICATIONS")

    ed1_p = doc.add_paragraph()
    ed1_p.paragraph_format.space_after = Pt(2)
    r_e1 = ed1_p.add_run("Bachelor of Computing Science")
    r_e1.font.bold = True
    ed1_p.add_run(" — Coventry University (Singapore Campus)\tMar 2025 – Sep 2026")

    ed2_p = doc.add_paragraph()
    ed2_p.paragraph_format.space_after = Pt(4)
    r_e2 = ed2_p.add_run("Diploma in Business Management & Computing")
    r_e2.font.bold = True
    ed2_p.add_run(" — Strategy First Int. College\tJan 2022 – Jan 2025\n")
    r_gpa = ed2_p.add_run("• Academic Standing: GPA 3.90 / 4.00")
    r_gpa.font.italic = True

    # --- LICENSES & PERSONAL ATTRIBUTES ---
    add_heading_1("LICENSES & PERSONAL ATTRIBUTES")
    
    bullets_misc = [
        ("Driving License: ", "Valid Driving License holder (Clean driving record). Experienced in daily urban road navigation."),
        ("Food Hygiene Awareness: ", "Familiar with sanitation & food handling safety; ready to take WSQ Food Safety Course upon request."),
        ("Physical Stamina: ", "Fit, healthy, and capable of heavy lifting (20+ kg), manual labor, and standing for long shift durations."),
        ("Flexibility & Reliability: ", "Punctual with great attendance; available for rotational shifts, weekends, night shifts, and public holidays.")
    ]
    for bold_txt, norm_txt in bullets_misc:
        bp = doc.add_paragraph(style='List Bullet')
        bp.paragraph_format.space_after = Pt(2)
        bp.paragraph_format.line_spacing = 1.1
        r_b = bp.add_run(bold_txt)
        r_b.font.bold = True
        bp.add_run(norm_txt)

    doc.save("d:/documents/OneDrive/cv/Pyae_Phyo_Maung_Maung_General_CV.docx")
    print("Saved Pyae_Phyo_Maung_Maung_General_CV.docx successfully")

if __name__ == "__main__":
    build_general_cv()
