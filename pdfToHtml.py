# pip3 install pdfminer-six
# pip3 install pdfminer
# pip3 install Path
# pip3 install Path
# pip3 install Iterable
 
from pathlib import Path
from typing import Iterable, Any

import pdfminer
from pdfminer.image import ImageWriter
from pdfminer.high_level import extract_pages
from pdfminer.pdftypes import resolve_all, PDFObjRef
from binascii import b2a_hex
import sys
import io
from PIL import Image
import php
my = php.kit()
# From : https://stackoverflow.com/questions/22898145/how-to-extract-text-and-text-coordinates-from-a-pdf-file

div_infos = []
text_infos = []
img_infos = []
img_info_infos = []

def show_ltitem_hierarchy(o: Any, depth=0,_page_num=None):
    global div_infos
    global text_infos
    global img_infos
    """Show location and text of LTItem and all its descendants"""
    global pages_img
    #if depth == 0:
    #    print('element                        x1  y1  x2  y2   text')
    #    print('------------------------------ --- --- --- ---- -----')

    print(
        f'{get_indented_name(o, depth):<30.30s} '
        f'{get_optional_bbox(o)} '
        f'{get_optional_text(o)}'
    )
    _text_kind = my.trim(get_indented_name(o, depth))
    #print("_text_kind: %s\n" % (_text_kind))
    _text = get_optional_text(o)
    
    if isinstance(o, Iterable):
        page_num = 0;
        if _page_num!=None:
          page_num = _page_num
        for i in o:
            if depth == 0:
                print("######################### PAGE ########################\nPage: %d\n" % (page_num+1))
                save_images_from_page(pages_img[page_num],(page_num+1))
                #img_infos = img_infos + img_info
                page_num = page_num+1
                if page_num > 10: 
                    break
                                     
            show_ltitem_hierarchy(i, depth=depth + 1,_page_num=page_num)
            
                        
            # ,'LTTextLineHorizontal','LTChar'            
            if _text_kind in ['LTTextBoxHorizontal']:      
                d = {                  
                  "page_num": page_num-1, 
                  "text_kind": _text_kind,
                  "bbox": my.explode(" ",my.trim(get_optional_bbox(o))),
                  "x0": float("%.2f" % ( get_optional_kind(o,"x0"))),
                  "y0": float("%.2f" % ( get_optional_kind(o,"y0"))),
                  "width": float("%.2f" % ( get_optional_kind(o,"width"))),
                  "height": float("%.2f" % ( get_optional_kind(o,"height"))),
                  "size": get_optional_kind(o,"size"),
                  "fontname": get_optional_kind(o,"fontname"),
                  "word_margin": get_optional_kind(o,"word_margin"),
                  "ncs": get_optional_kind(o,"ncs"),
                  "text": _text,
                  "pageid": get_optional_kind(o,"pageid"),
                  "rotate": get_optional_kind(o,"rotate") 
                }
                #print(dir(o))
                if d not in text_infos:
                    text_infos.append(d)
            elif _text_kind in ['LTTextLineHorizontal','LTChar']:
                pass
            elif _text_kind in ['LTImageGG']:
                d = {                  
                  "page_num": page_num, 
                  "text_kind": _text_kind,
                  "bbox": my.explode(" ",my.trim(get_optional_bbox(o))),
                  "x0": float("%.2f" % ( get_optional_kind(o,"x0"))),
                  "y0": float("%.2f" % ( get_optional_kind(o,"y0"))),
                  "width": float("%.2f" % ( get_optional_kind(o,"width"))),
                  "height": float("%.2f" % ( get_optional_kind(o,"height"))),
                  "size": get_optional_kind(o,"size"),
                  "fontname": get_optional_kind(o,"fontname"),
                  "word_margin": get_optional_kind(o,"word_margin"),
                  "ncs": get_optional_kind(o,"ncs"),
                  "text": _text,
                  "pageid": get_optional_kind(o,"pageid"),
                  "rotate": get_optional_kind(o,"rotate")  
                }
                img_info_infos.append(d)        
            elif _text_kind in ['LTLine','LTRect']:
                # 處理一些方框、顏色...
                d = {                  
                  "page_num": page_num, 
                  "text_kind": _text_kind,
                  "bbox": my.explode(" ",my.trim(get_optional_bbox(o))),
                  "x0": float("%.2f" % ( get_optional_kind(o,"x0"))),
                  "y0": float("%.2f" % ( get_optional_kind(o,"y0"))),
                  "width": float("%.2f" % ( get_optional_kind(o,"width"))),
                  "height": float("%.2f" % ( get_optional_kind(o,"height"))),
                  "size": get_optional_kind(o,"size"),
                  "fontname": get_optional_kind(o,"fontname"),
                  "word_margin": get_optional_kind(o,"word_margin"),
                  "ncs": get_optional_kind(o,"ncs"),
                  "text": _text,
                  "pageid": get_optional_kind(o,"pageid"),
                  "rotate": get_optional_kind(o,"rotate")  
                }
                div_infos.append(d)                
                #print(_text)                
                #print(dir(o))
    else:
        
        #sys.exit()
        if _text_kind in ['LTLine','LTRect']:
            #print(_text)                
            #print(dir(o))
            #sys.exit()
            # 處理一些方框、顏色...
            d = {                  
              "page_num": _page_num, 
              "text_kind": _text_kind,
              "bbox": my.explode(" ",my.trim(get_optional_bbox(o))),
              "x0": float("%.2f" % ( get_optional_kind(o,"x0"))),
              "y0": float("%.2f" % ( get_optional_kind(o,"y0"))),
              "width": float("%.2f" % ( get_optional_kind(o,"width"))),
              "height": float("%.2f" % ( get_optional_kind(o,"height"))),
              "size": get_optional_kind(o,"size"),
              "fontname": get_optional_kind(o,"fontname"),
              "word_margin": get_optional_kind(o,"word_margin"),
              "ncs": get_optional_kind(o,"ncs"),
              "text": _text,
              "pageid": get_optional_kind(o,"pageid"),
              "rotate": get_optional_kind(o,"rotate"),
              "fill": get_optional_kind(o,"fill"),
              "stroke": get_optional_kind(o,"stroke"),
              "stroking_color": get_optional_kind(o,"stroking_color"),
              "linewidth": get_optional_kind(o,"linewidth"),
              "non_stroking_color": get_optional_kind(o,"non_stroking_color"),
              #"pts": get_optional_kind(o,"pts")  
            }
            div_infos.append(d)
            #print(d)             
            #sys.exit()        
        elif _text_kind in ['LTImageGG']:
            d = {                  
              "page_num": _page_num, 
              "text_kind": _text_kind,
              "bbox": my.explode(" ",my.trim(get_optional_bbox(o))),
              "x0": float("%.2f" % ( get_optional_kind(o,"x0"))),
              "y0": float("%.2f" % ( get_optional_kind(o,"y0"))),
              "width": float("%.2f" % ( get_optional_kind(o,"width"))),
              "height": float("%.2f" % ( get_optional_kind(o,"height"))),
              "size": get_optional_kind(o,"size"),
              "fontname": get_optional_kind(o,"fontname"),
              "word_margin": get_optional_kind(o,"word_margin"),
              "ncs": get_optional_kind(o,"ncs"),
              "text": _text,
              "pageid": get_optional_kind(o,"pageid"),
              "rotate": get_optional_kind(o,"rotate")  
            }
            img_info_infos.append(d)            

def get_indented_name(o: Any, depth: int) -> str:
    """Indented name of LTItem"""
    return '  ' * depth + o.__class__.__name__


def get_optional_bbox(o: Any) -> str:
    """Bounding box of LTItem if available, otherwise empty string"""
    #print(dir(o))
    if hasattr(o, 'bbox'):
        return ''.join(f'{i:.2f} ' for i in o.bbox)
    return ''
def get_optional_kind(o: Any,kind) -> str:
    """Bounding box of LTItem if available, otherwise empty string"""
    #print(dir(o))
    #sys.exit()
    # from : https://stackoverflow.com/questions/13595690/getting-dynamic-attribute-in-python
    try:
        if hasattr(o, kind ):
            #print(o)
            v = getattr(o,kind)
            if isinstance(v, list):
                return "".join(f'{i} ' for i in v)
            else:
                return v 
    except:
        pass
    return None
# From : https://stackoverflow.com/questions/68891001/pdf-miner-how-to-extract-images    
def get_image(layout_object):
    if isinstance(layout_object, pdfminer.layout.LTImage):
        return layout_object
    if isinstance(layout_object, pdfminer.layout.LTContainer):
        for child in layout_object:
            return get_image(child)
    else:
        return None

def determine_image_type (stream_first_4_bytes):
    """Find out the image file type based on the magic number comparison of the first 4 (or 2) bytes"""
    # From : https://denis.papathanasiou.org/archive/2010.08.04.post.pdf
    file_type = None
    bytes_as_hex = b2a_hex(stream_first_4_bytes)
    if bytes_as_hex.startswith(b'ffd8'):
        file_type = '.jpeg'
    elif bytes_as_hex == '89504e47':
        file_type = ',png'
    elif bytes_as_hex == '47494638':
        file_type = '.gif'
    elif bytes_as_hex.startswith(b'424d'):
        file_type = '.bmp'
    return file_type
def write_file (folder, filename, filedata, flags='w'):
    """Write the file data to the folder and filename combination
    (flags: 'w' for write text, 'wb' for write binary, use 'a' instead of 'w' for append)"""
    result = False
    if os.path.isdir(folder):
        try:
            file_obj = open(os.path.join(folder, filename), flags)
            file_obj.write(filedata)
            file_obj.close()
            result = True
        except IOError:
            pass
    return result
def save_images_from_page(page: pdfminer.layout.LTPage,page_number):
    global img_info_infos
    global img_infos
    images = list(filter(bool, map(get_image, page)))
    #iw = ImageWriter('output_dir')
    # from : https://github.com/pdfminer/pdfminer.six/issues/754
    mp = map(get_image, page)
    #print(len(mp))
    #print(len(images))
    #sys.exit()
    global OUTPUT_PATH
    OUTPUT_PIC_PATH = OUTPUT_PATH + my.SP() + "pic"
    if my.is_dir(OUTPUT_PIC_PATH)==False:
        my.mkdir(OUTPUT_PIC_PATH)
    step = 1
    for o in mp:
        _text_kind = my.trim(get_indented_name(o, 0))
        _text = get_optional_text(o)
        try:  
            d = {                  
              "page_num": page_number, 
              "text_kind": _text_kind,
              "bbox": my.explode(" ",my.trim(get_optional_bbox(o))),
              "x0": float("%.2f" % ( get_optional_kind(o,"x0"))),
              "y0": float("%.2f" % ( get_optional_kind(o,"y0"))),
              "width": float("%.2f" % ( get_optional_kind(o,"width"))),
              "height": float("%.2f" % ( get_optional_kind(o,"height"))),
              "size": get_optional_kind(o,"size"),
              "fontname": get_optional_kind(o,"fontname"),
              "word_margin": get_optional_kind(o,"word_margin"),
              "ncs": get_optional_kind(o,"ncs"),
              "text": _text,
              "pageid": get_optional_kind(o,"pageid"),
              "rotate": get_optional_kind(o,"rotate"),
                
            }
            img_info_infos.append(d)
        except:
            pass
        #print(d)
    #sys.exit()
    
    #img_info = []
    for image in images:
        #if len(image.colorspace) == 1 and isinstance(image.colorspace[0], PDFObjRef):
        #    image.colorspace = resolve_all(image.colorspace[0])
        #    if not isinstance(image.colorspace, list):
        #        image.colorspace = [ image.colorspace ]
        #print(f'{image=}')
        #print(f'{image.colorspace=}')
        #print(image)
        #print(dir(image))
        # From : https://stackoverflow.com/questions/38317327/python-pdfminer-extract-image-produces-multiple-images-per-page-should-be-singl
        
        im = None
        try:  
            im = Image.open(io.BytesIO(image.stream.get_data()))
        except:
            #continue
            pass
        #print(im.format)
        #print(page)
        #sys.exit()
        d = {
          "file_name": str(page_number) + "_" + str(step) + ".png",
          "page_num": page_number,
          "x": image.x0,
          "y": image.y0,
          "w": image.width,
          "h": image.height 
        }
        #print(d)
        img_infos.append(d)
        #im.save(OUTPUT_PIC_PATH + my.SP() + d["file_name"]);
        try:
            im = im.convert('RGBA')
            im2 = im.copy()
            im2.putalpha(180)
            im.paste(im2, im)
            im.save(OUTPUT_PIC_PATH + my.SP() + d["file_name"], "PNG", optimize=False)
        except:
            pass
        step = step + 1      
    #sys.exit()
    #return img_info    
        
def get_optional_text(o: Any) -> str:
    """Text of LTItem if available, otherwise empty string"""
    if hasattr(o, 'get_text'):
        return o.get_text().strip()
    return ''

message = """
  PDF to html
  Author: FeatherMountain ( https://3wa.tw )
  
  Usage:
    python3 pdfToHtml.py sample.pdf [output_path]
    
"""

if len(sys.argv) < 2 or my.is_file(sys.argv[1]) == False or my.strtolower(my.subname(sys.argv[1]))!="pdf":
    print(message);
    sys.exit()

OUTPUT_PATH = my.mainname(sys.argv[1])

if len(sys.argv) > 2:
  OUTPUT_PATH = my.mainname(sys.argv[2])

if my.is_dir(OUTPUT_PATH)==False:
    my.mkdir(OUTPUT_PATH) 

path = Path(sys.argv[1]).expanduser()

pages_img = list(extract_pages(path))
pages = extract_pages(path)
#print(pages)
#sys.exit()
show_ltitem_hierarchy(pages)

text_json = my.json_format_utf8(my.json_encode_utf8(text_infos))
img_json = my.json_format_utf8(my.json_encode_utf8(img_infos))
img_info_json = my.json_format_utf8(my.json_encode_utf8(img_info_infos))
div_json = my.json_format_utf8(my.json_encode_utf8(div_infos))

#print(text_json)
print(img_json)
#print(div_json)

my.file_put_contents(OUTPUT_PATH+my.SP()+"text.js","text_json="+text_json+";")
my.file_put_contents(OUTPUT_PATH+my.SP()+"img.js","img_json="+img_json+";")
my.file_put_contents(OUTPUT_PATH+my.SP()+"img_info.js","img_info_json="+img_info_json+";")
my.file_put_contents(OUTPUT_PATH+my.SP()+"div.js","div_json="+div_json+";")