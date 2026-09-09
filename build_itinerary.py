from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from pathlib import Path

OUT = Path('output')
OUT.mkdir(exist_ok=True)
DOCX = OUT / 'Italy_France_Trip_Itinerary_2026-10-11_to_2026-10-25_Final.docx'

def shade(cell, fill):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = tcPr.find(qn('w:shd'))
    if shd is None:
        shd = OxmlElement('w:shd')
        tcPr.append(shd)
    shd.set(qn('w:fill'), fill)

def borders(table, color='D9D9D9', size='6'):
    tblPr = table._tbl.tblPr
    b = tblPr.first_child_found_in('w:tblBorders')
    if b is None:
        b = OxmlElement('w:tblBorders')
        tblPr.append(b)
    for edge in ('top','left','bottom','right','insideH','insideV'):
        el = b.find(qn('w:'+edge))
        if el is None:
            el = OxmlElement('w:'+edge)
            b.append(el)
        el.set(qn('w:val'),'single'); el.set(qn('w:sz'),size); el.set(qn('w:space'),'0'); el.set(qn('w:color'),color)

def margins(cell):
    tcPr = cell._tc.get_or_add_tcPr()
    mar = tcPr.first_child_found_in('w:tcMar')
    if mar is None:
        mar = OxmlElement('w:tcMar')
        tcPr.append(mar)
    for side,val in [('top',80),('start',100),('bottom',80),('end',100)]:
        node = mar.find(qn('w:'+side))
        if node is None:
            node = OxmlElement('w:'+side)
            mar.append(node)
        node.set(qn('w:w'),str(val)); node.set(qn('w:type'),'dxa')

def put(cell, text, bold=False, color='000000', size=8.6, align=None):
    cell.text = ''
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.line_spacing = 1.04
    if align is not None: p.alignment = align
    r = p.add_run(text)
    r.bold = bold; r.font.name='Heiti SC'; r._element.rPr.rFonts.set(qn('w:ascii'),'Heiti SC'); r._element.rPr.rFonts.set(qn('w:hAnsi'),'Heiti SC'); r._element.rPr.rFonts.set(qn('w:eastAsia'),'Heiti SC'); r._element.rPr.rFonts.set(qn('w:cs'),'Heiti SC'); r.font.size=Pt(size); r.font.color.rgb=RGBColor.from_string(color)
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    margins(cell)

def repeat_header(row):
    trPr = row._tr.get_or_add_trPr()
    e = OxmlElement('w:tblHeader'); e.set(qn('w:val'),'true'); trPr.append(e)

def cant_split(row):
    trPr=row._tr.get_or_add_trPr(); e=OxmlElement('w:cantSplit'); trPr.append(e)

doc = Document()
sec = doc.sections[0]
sec.page_width=Inches(8.5); sec.page_height=Inches(11)
sec.top_margin=Inches(.55); sec.bottom_margin=Inches(.55); sec.left_margin=Inches(.55); sec.right_margin=Inches(.55)
normal=doc.styles['Normal']
normal.font.name='Heiti SC'; normal._element.rPr.rFonts.set(qn('w:ascii'),'Heiti SC'); normal._element.rPr.rFonts.set(qn('w:hAnsi'),'Heiti SC'); normal._element.rPr.rFonts.set(qn('w:eastAsia'),'Heiti SC'); normal.font.size=Pt(10); normal.font.color.rgb=RGBColor(0,0,0); normal.paragraph_format.space_after=Pt(4); normal.paragraph_format.line_spacing=1.1
for name,size in [('Title',22),('Heading 1',14)]:
    st=doc.styles[name]; st.font.name='Heiti SC'; st._element.rPr.rFonts.set(qn('w:ascii'),'Heiti SC'); st._element.rPr.rFonts.set(qn('w:hAnsi'),'Heiti SC'); st._element.rPr.rFonts.set(qn('w:eastAsia'),'Heiti SC'); st.font.size=Pt(size); st.font.bold=True; st.font.color.rgb=RGBColor(0,0,0)

p=doc.add_paragraph(style='Title'); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.add_run('Travel Itinerary')
p=doc.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_after=Pt(10)
r=p.add_run('Italy and France  |  11 October 2026 to 25 October 2026'); r.font.name='Heiti SC'; r._element.rPr.rFonts.set(qn('w:ascii'),'Heiti SC'); r._element.rPr.rFonts.set(qn('w:hAnsi'),'Heiti SC'); r._element.rPr.rFonts.set(qn('w:eastAsia'),'Heiti SC'); r.font.size=Pt(11); r.font.color.rgb=RGBColor.from_string('555555')
p=doc.add_paragraph(); p.paragraph_format.space_after=Pt(8); p.add_run('Purpose. ').bold=True; p.add_run('本行程为欧洲观光旅行，先抵达法国巴黎，再前往尼斯，随后进入意大利佛罗伦萨和罗马，最后从罗马返回中国。意大利安排 9 晚，法国安排 5 晚，意大利为本次旅行的主要目的地。以下中文说明用于解释每日旅游安排，英文城市和景点名称与机票及预订材料保持一致。')

doc.add_paragraph('Trip Overview',style='Heading 1')
ov=doc.add_table(rows=4,cols=4); ov.alignment=WD_TABLE_ALIGNMENT.CENTER; ov.autofit=False; borders(ov)
ow=[1.15,2.0,1.15,3.0]
overview=[('Travel dates','11 Oct 2026 - 25 Oct 2026','Route','Shanghai - Beijing - Paris - Nice - Florence - Rome - Beijing - Shanghai'),('Countries','China, France and Italy','Purpose','Tourism and cultural visits / 旅游观光与文化参访'),('France stay','Paris 11-14 Oct; Nice 14-16 Oct: 5 nights','Italy stay','Florence 16-20 Oct; Rome 20-25 Oct: 9 nights'),('Entry / exit plan','Arrive in Paris; depart from Rome','Main transport','Air China flights; trains; local public transport and walking')]
for ri,row in enumerate(ov.rows):
    for ci,c in enumerate(row.cells):
        c.width=Inches(ow[ci]); put(c,overview[ri][ci],bold=(ci%2==0),size=8.7)
        if ci%2==0: shade(c,'EAF0F6')

doc.add_paragraph('Daily Itinerary',style='Heading 1')
headers=['Day / Date','Country / City','Planned activities / 具体行程','Transportation / 交通','Accommodation / 住宿']
t=doc.add_table(rows=1,cols=5); t.alignment=WD_TABLE_ALIGNMENT.CENTER; t.autofit=False; borders(t)
tw=[.78,1.18,2.45,1.33,1.48]
for i,c in enumerate(t.rows[0].cells):
    c.width=Inches(tw[i]); put(c,headers[i],bold=True,color='FFFFFF',size=8.4,align=WD_ALIGN_PARAGRAPH.CENTER); shade(c,'34495E')
repeat_header(t.rows[0])
rows=[
('1\n11 Oct Sun','China → France\nShanghai / Beijing / Paris','从上海虹桥机场出发，经北京转机前往巴黎。抵达后前往住宿地办理入住并休息。\nCA1590 SHA-PEK 08:55-11:10; CA933 PEK-CDG 13:30-18:15','Airport transfer; international flight','Ucpa Sport Station Hostel Paris\nConfirmed booking; 28 All. Rose Dieng-Kuntz'),
('2\n12 Oct Mon','France\nParis','游览埃菲尔铁塔、香榭丽舍大街和凯旋门，晚间安排塞纳河游船，感受巴黎城市景观。','Metro, bus and walk','Same as above'),
('3\n13 Oct Tue','France\nParis','参观卢浮宫、杜乐丽花园和协和广场，进行巴黎历史与艺术文化观光。','Metro, bus and walk','Same as above'),
('4\n14 Oct Wed','France\nParis to Nice','上午从巴黎住宿地退房，乘火车前往尼斯。抵达后游览英国人漫步大道和尼斯老城区。','TGV / intercity train; local transport and walk','Nice accommodation - to be confirmed with actual reservation'),
('5\n15 Oct Thu','France\nNice','游览马塞纳广场、萨雷亚花市和城堡山公园，欣赏尼斯市区及地中海景色。','Bus, tram and walk','Same as above'),
('6\n16 Oct Fri','Italy\nNice to Florence','从尼斯前往佛罗伦萨，抵达后办理入住，安排米开朗琪罗广场及佛罗伦萨历史中心的晚间散步。','Train via Milan or Turin; local transport and walk','Florence accommodation - to be confirmed with actual reservation'),
('7\n17 Oct Sat','Italy\nFlorence','参观乌菲兹美术馆、领主广场、老桥及旧宫外观，了解佛罗伦萨文艺复兴艺术。','Public transport and walk','Same as above'),
('8\n18 Oct Sun','Italy\nFlorence','参观圣母百花大教堂建筑群、洗礼堂区域和圣十字圣殿，进行城市文化观光。','Public transport and walk','Same as above'),
('9\n19 Oct Mon','Italy\nFlorence','游览米开朗琪罗广场和奥尔特拉诺区，体验当地街区、手工艺店和城市生活。','Bus and walk','Same as above'),
('10\n20 Oct Tue','Italy\nFlorence to Rome','从佛罗伦萨退房并乘高速列车前往罗马。抵达后游览斗兽场和古罗马广场区域。','High-speed train; metro and walk','Rome accommodation - to be confirmed with actual reservation'),
('11\n21 Oct Wed','Italy\nRome','游览万神殿、纳沃纳广场和特莱维喷泉，漫步罗马历史中心。','Metro, bus and walk','Same as above'),
('12\n22 Oct Thu','Italy\nRome','参观梵蒂冈博物馆、西斯廷礼拜堂及圣彼得大教堂 / 圣彼得广场。','Metro, bus and walk','Same as above'),
('13\n23 Oct Fri','Italy\nRome','游览卡比托利欧山、威尼斯广场和圣天使堡周边，安排台伯河沿岸散步。','Public transport and walk','Same as above'),
('14\n24 Oct Sat','Italy\nRome','游览西班牙阶梯、博尔盖塞公园和人民广场，安排最后的城市观光与返程准备。','Metro, bus and walk','Same as above'),
('15\n25 Oct Sun','Italy → China\nRome / Beijing / Shanghai','办理退房并前往罗马机场，乘国航航班经北京返回上海。\nCA940 FCO-PEK 13:00-19:50; CA1521 PEK-SHA 14:30-16:55 (26 Oct)','Airport transfer; international flight','Return home on 26 Oct')]
for ri,data in enumerate(rows):
    cells=t.add_row().cells
    cant_split(t.rows[-1])
    for ci,val in enumerate(data):
        cells[ci].width=Inches(tw[ci]); put(cells[ci],val,size=8.05,align=WD_ALIGN_PARAGRAPH.CENTER if ci in (0,1) else WD_ALIGN_PARAGRAPH.LEFT)
        if ri%2==1: shade(cells[ci],'F7F9FB')

doc.add_paragraph('Reservation and Documentation Notes',style='Heading 1')
notes=['The flight details above are transcribed from the provided Air China booking confirmation: CA1590 and CA933 on 11 Oct; CA940 on 25 Oct; CA1521 on 26 Oct. Please attach the issued ticket and check the sequence before submission.','The Paris accommodation is supported by the provided booking confirmation: Ucpa Sport Station Hostel Paris, 28 All. Rose Dieng-Kuntz, booking number 1128150686005980, check-in 11 Oct and check-out 14 Oct, 3 nights.','The Nice, Florence and Rome accommodation fields are planning placeholders. Before submission, replace them with the actual hotel names, addresses, telephone numbers and booking confirmations.','Train routes and sightseeing arrangements are planned for tourism purposes and may be adjusted according to ticket availability, opening hours and weather.']
for n in notes:
    p=doc.add_paragraph(); p.paragraph_format.left_indent=Inches(.16); p.paragraph_format.first_line_indent=Inches(-.16); p.add_run('• ').bold=True; p.add_run(n)
foot=sec.footer.paragraphs[0]; foot.alignment=WD_ALIGN_PARAGRAPH.CENTER; r=foot.add_run('Travel Itinerary  |  11 October 2026 to 25 October 2026'); r.font.name='Arial'; r.font.size=Pt(8); r.font.color.rgb=RGBColor.from_string('777777')
doc.save(DOCX); print(DOCX)
