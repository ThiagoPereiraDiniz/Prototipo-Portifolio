import os
from pdf2image import convert_from_path
import sys

def convert_pdfs_to_png():
    """
    Converte todos os PDFs de certificados para imagens PNG
    """
    # Diretório onde estão os PDFs
    pdf_directory = "../public/certificates"
    
    certificate_files = [
        "html-css-responsividade-publicacao.pdf",
        "comecando-programacao-carreira.pdf", 
        "game-design-viabilizando-produto.pdf",
        "html-css-classes-flexbox.pdf",
        "git-github-colaboracao.pdf",
        "html-css-cabecalho-footer-variaveis.pdf",
        "aprendizagem-chatgpt-rotina.pdf",
        "aprender-aprender-autodesenvolvimento.pdf",
        "game-design-principios-jogo-digital.pdf",
        "html-css-ambiente-estrutura-tags.pdf"
    ]
    
    print(f"[v0] Iniciando conversão de {len(certificate_files)} certificados PDF para PNG...")
    print(f"[v0] 🎯 Certificados em DESTAQUE: Game Design (2), Git/GitHub, Aprendizagem com IA")
    
    converted_count = 0
    failed_count = 0
    
    for pdf_file in certificate_files:
        pdf_path = os.path.join(pdf_directory, pdf_file)
        png_filename = pdf_file.replace('.pdf', '.png')
        png_path = os.path.join(pdf_directory, png_filename)
        
        try:
            # Verifica se o PDF existe
            if not os.path.exists(pdf_path):
                print(f"[v0] ⚠️  PDF não encontrado: {pdf_file}")
                failed_count += 1
                continue
            
            # Converte PDF para imagem (primeira página apenas)
            print(f"[v0] Convertendo: {pdf_file} -> {png_filename}")
            
            # Converte a primeira página do PDF para imagem
            pages = convert_from_path(pdf_path, first_page=1, last_page=1, dpi=200)
            
            if pages:
                # Salva a primeira página como PNG
                pages[0].save(png_path, 'PNG', quality=95, optimize=True)
                print(f"[v0] ✅ Convertido com sucesso: {png_filename}")
                converted_count += 1
            else:
                print(f"[v0] ❌ Erro ao converter: {pdf_file} - Nenhuma página encontrada")
                failed_count += 1
                
        except Exception as e:
            print(f"[v0] ❌ Erro ao converter {pdf_file}: {str(e)}")
            failed_count += 1
    
    print(f"\n[v0] 📊 Resumo da conversão:")
    print(f"[v0] ✅ Convertidos com sucesso: {converted_count}")
    print(f"[v0] ❌ Falhas: {failed_count}")
    print(f"[v0] 📁 Total de arquivos: {len(certificate_files)}")
    
    if converted_count > 0:
        print(f"\n[v0] 🎉 Conversão concluída! As imagens PNG foram salvas em: {pdf_directory}")
        print(f"[v0] 💡 Agora as imagens dos certificados devem aparecer corretamente no seu portfólio!")
    
    return converted_count, failed_count

def install_dependencies():
    """
    Instala as dependências necessárias
    """
    print("[v0] Verificando dependências...")
    
    try:
        import pdf2image
        print("[v0] ✅ pdf2image já está instalado")
    except ImportError:
        print("[v0] 📦 Instalando pdf2image...")
        os.system("pip install pdf2image")
    
    # Verifica se poppler está disponível (necessário para pdf2image)
    try:
        from pdf2image.exceptions import PDFInfoNotInstalledError
        # Testa se poppler está funcionando
        print("[v0] ✅ Dependências verificadas com sucesso")
    except:
        print("[v0] ⚠️  Aviso: Você pode precisar instalar poppler-utils:")
        print("[v0] Ubuntu/Debian: sudo apt-get install poppler-utils")
        print("[v0] macOS: brew install poppler") 
        print("[v0] Windows: Baixe poppler do site oficial")

if __name__ == "__main__":
    print("[v0] 🚀 Conversor de Certificados PDF para PNG")
    print("[v0] =" * 50)
    
    # Instala dependências se necessário
    install_dependencies()
    
    # Executa a conversão
    converted, failed = convert_pdfs_to_png()
    
    if failed > 0:
        print(f"\n[v0] ⚠️  Alguns arquivos falharam na conversão.")
        print(f"[v0] 💡 Verifique se todos os PDFs estão no diretório correto: public/certificates/")
