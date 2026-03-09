import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main className="section" style={{ background: "var(--cream)" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <span className="badge" style={{ marginBottom: "1rem" }}>Segurança e Transparência</span>
          <h1 style={{ marginBottom: "2rem" }}>Política de Privacidade</h1>
          
          <div className="article-content" style={{ textAlign: "justify" }}>
            <p>
              A sua privacidade é importante para nós. É política do <strong>Cozinha Mais Consciente</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Cozinha Mais Consciente, e outros sites que possuímos e operamos.
            </p>

            <h2>1. Coleta de Dados</h2>
            <p>
              Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço (como no caso de nosso formulário de contato para especialistas). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
            </p>

            <h2>2. Uso e Retenção</h2>
            <p>
              Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, os protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
            </p>

            <h2>3. Compartilhamento de Informações</h2>
            <p>
              Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei ou quando você solicita expressamente o contato com um especialista parceiro através de nossos formulários.
            </p>

            <h2>4. Cookies</h2>
            <p>
              Utilizamos cookies para entender como você interage com nosso conteúdo e para melhorar sua experiência. Você é livre para recusar a nossa solicitação de cookies, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
            </p>

            <h2>5. Compromisso do Usuário (LGPD)</h2>
            <p>
              O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Cozinha Mais Consciente oferece no site e com caráter enunciativo, mas não limitativo.
            </p>

            <h2>6. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
            </p>
            
            <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "var(--text-light)" }}>
              Esta política é efetiva a partir de Março de 2025.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
