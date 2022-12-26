from PIL import Image
import pdfminer
from pdfminer.converter import PDFPageAggregator
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser
import sys
with open(sys.argv[1], 'rb') as fp:
    parser = PDFParser(fp)
    doc = PDFDocument(parser)
    rsrcmgr = PDFResourceManager()
    device = PDFPageAggregator(rsrcmgr)
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    for page in PDFPage.create_pages(doc):
        interpreter.process_page(page)
        layout = device.get_result()
        for figure in layout:
            if isinstance(figure, pdfminer.layout.LTImage)==False:
                continue
            for image_object in figure:
                print(image_object);
                #sys.exit()
                try:
                    image = Image.frombytes('RGB', image_object.srcsize, image_object.stream.get_rawdata(), 'raw')
                    with open(image_object.name + '.bmp', 'wb') as fp:
                        image.save(fp)
                except:
                    pass