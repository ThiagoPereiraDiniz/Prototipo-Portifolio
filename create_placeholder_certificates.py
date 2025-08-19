from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_certificate(title, issuer, filename):
    """
    Cria uma imagem placeholder para um certificado
    """
    # Dimensões da imagem (proporção 16:9 para boa visualização)
    width, height = 800, 450
    
    # Cores baseadas no tema do portfólio
    bg_color = (17, 34, 64)  # #112240
    accent_color = (100, 255, 218)  # #64ffda
    text_color = (245, 240, 225)  # #f5f0e1
    
    # Cria a imagem
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    try:
        # Tenta usar uma fonte do sistema
        title_font = ImageFont.truetype("arial.ttf", 36)
        issuer_font = ImageFont.truetype("arial.ttf", 24)
        label_font = ImageFont.truetype("arial.ttf", 18)
    except:
        # Fallback para fonte padrão
        title_font = ImageFont.load_default()
        issuer_font = ImageFont.load_default()
        label_font = ImageFont.load_default()
    
    # Desenha bordas decorativas
    border_width = 8
    draw.rectangle([border_width, border_width, width-border_width, height-border_width], 
                  outline=accent_color, width=3)
    
    # Desenha "CERTIFICADO" no topo
    cert_text = "CERTIFICADO"
    cert_bbox = draw.textbbox((0, 0), cert_text, font=label_font)
    cert_width = cert_bbox[2] - cert_bbox[0]
    draw.text(((width - cert_width) // 2, 40), cert_text, 
              fill=accent_color, font=label_font)
    
    # Desenha o título (quebra em linhas se necessário)
    words = title.split()
    lines = []
    current_line = []
    
    for word in words:
        test_line = ' '.join(current_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=title_font)
        if bbox[2] - bbox[0] < width - 100:  # Margem de 50px de cada lado
            current_line.append(word)
        else:
            if current_line:
                lines.append(' '.join(current_line))
                current_line = [word]
            else:
                lines.append(word)
    
    if current_line:
        lines.append(' '.join(current_line))
    
    # Desenha as linhas do título
    y_offset = 120
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=title_font)
        line_width = bbox[2] - bbox[0]
        draw.text(((width - line_width) // 2, y_offset), line, 
                  fill=text_color, font=title_font)
        y_offset += 45
    
    # Desenha o emissor
    issuer_bbox = draw.textbbox((0, 0), issuer, font=issuer_font)
    issuer_width = issuer_bbox[2] - issuer_bbox[0]
    draw.text(((width - issuer_width) // 2, height - 100), issuer, 
              fill=accent_color, font=issuer_font)
    
    # Desenha um ícone simples de certificado
    icon_size = 40
    icon_x = width // 2 - icon_size // 2
    icon_y = height - 160
    
    # Desenha um losango simples como ícone
    points = [
        (icon_x + icon_size//2, icon_y),
        (icon_x + icon_size, icon_y + icon_size//2),
        (icon_x + icon_size//2, icon_y + icon_size),
        (icon_x, icon_y + icon_size//2)
    ]
    draw.polygon(points, fill=accent_color)
    
    return img

def create_all_placeholder_certificates():
    """
    Cria imagens placeholder para todos os certificados
    """
    certificates_data = [
        ("Programa Trilhas Inova - Programação de Jogos", "SECTI/FAPEMA Maranhão", "trilhas-inova.png"),
        ("React: Desenvolvendo com JavaScript", "Alura", "react-javascript.png"),
        ("Unity: Criando um Jogo Metroidvania 2D", "Alura", "unity-metroidvania.png"),
        ("JavaScript para Web: Crie Páginas Dinâmicas", "Alura", "javascript-web.png"),
        ("Python para Data Science: Primeiros Passos", "Alura", "python-data-science.png"),
        ("JavaScript: Construindo Páginas Dinâmicas", "Alura", "javascript-dinamicas.png"),
        ("JavaScript: Utilizando Tipos, Variáveis e Funções", "Alura", "javascript-tipos.png"),
        ("JavaScript: Métodos de Array", "Alura", "javascript-arrays.png"),
        ("JavaScript: Manipulando Elementos no DOM", "Alura", "javascript-dom.png"),
        ("Git e GitHub: Compartilhando e Colaborando", "Alura", "git-github.png"),
        ("IA: Explorando o Potencial da IA Generativa", "Alura", "ia-generativa.png"),
        ("Unity 2D Parte 1: Criando um Jogo 2D", "Alura", "unity-2d-parte1.png"),
        ("Unity 2D Parte 2: Adicionando Efeitos Visuais", "Alura", "unity-2d-parte2.png"),
        ("HTML e CSS: Responsividade e Publicação", "Alura", "html-css-responsividade.png"),
        ("HTML e CSS: Cabeçalho, Footer e Variáveis CSS", "Alura", "html-css-cabecalho-footer.png"),
        ("HTML e CSS: Classes, Posicionamento e Flexbox", "Alura", "html-css-flexbox.png"),
        ("HTML e CSS: Ambientes de Desenvolvimento", "Alura", "html-css-ambiente.png"),
        ("Lógica de Programação: Explore Funções e Listas", "Alura", "logica-funcoes.png"),
        ("Lógica de Programação: Mergulhe em JavaScript", "Alura", "logica-javascript.png"),
        ("Lógica de Programação: Praticando com Desafios", "Alura", "logica-desafios.png"),
        ("Game Design: Viabilizando o Jogo como Produto", "Alura", "game-design-produto.png"),
        ("Game Design: Definindo os Princípios", "Alura", "game-design-principios.png"),
        ("Aprender a Aprender: Técnicas para Autodesenvolvimento", "Alura", "aprender-aprender.png"),
        ("Aprendizagem: Personalizando Estudos com ChatGPT", "Alura", "aprendizagem-chatgpt.png"),
        ("Começando em Programação: Carreira e Primeiros Passos", "Alura", "programacao-carreira.png")
    ]
    
    output_dir = "../public/certificates"
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"[v0] 🎨 Criando {len(certificates_data)} imagens placeholder...")
    
    created_count = 0
    for title, issuer, filename in certificates_data:
        try:
            img = create_placeholder_certificate(title, issuer, filename)
            filepath = os.path.join(output_dir, filename)
            img.save(filepath, 'PNG', quality=95, optimize=True)
            print(f"[v0] ✅ Criado: {filename}")
            created_count += 1
        except Exception as e:
            print(f"[v0] ❌ Erro ao criar {filename}: {str(e)}")
    
    print(f"\n[v0] 🎉 Criadas {created_count} imagens placeholder!")
    print(f"[v0] 📁 Salvas em: {output_dir}")
    print(f"[v0] 💡 Agora você pode substituir essas imagens pelas conversões dos PDFs reais!")

if __name__ == "__main__":
    print("[v0] 🎨 Gerador de Imagens Placeholder para Certificados")
    print("[v0] =" * 55)
    
    try:
        from PIL import Image, ImageDraw, ImageFont
        create_all_placeholder_certificates()
    except ImportError:
        print("[v0] ❌ Pillow não está instalado. Instalando...")
        os.system("pip install Pillow")
        print("[v0] ✅ Pillow instalado! Execute o script novamente.")
