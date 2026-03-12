import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade e tratamento de dados pessoais do portal Cozinha Mais Consciente, em conformidade com a LGPD (Lei Geral de Proteção de Dados).",
};

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

            <h2>1. Controlador dos Dados</h2>
            <p>
              O controlador responsável pelo tratamento dos seus dados pessoais é o portal <strong>Cozinha Mais Consciente</strong>, acessível pelo endereço <em>cozinhamaisconsciente.com.br</em>. Para questões relacionadas à privacidade e proteção de dados, entre em contato pelo e-mail: <strong>contato@cozinhamaisconsciente.com.br</strong>.
            </p>

            <h2>2. Base Legal para Tratamento (Art. 7° LGPD)</h2>
            <p>
              O tratamento dos seus dados pessoais é realizado com base no seu <strong>consentimento livre, informado e inequívoco</strong>, fornecido ao preencher nossos formulários de contato. Você pode revogar este consentimento a qualquer momento, conforme descrito na seção "Seus Direitos" abaixo.
            </p>

            <h2>3. Dados Coletados</h2>
            <p>Coletamos apenas os dados estritamente necessários para a finalidade informada:</p>
            <ul>
              <li><strong>Nome</strong> — para identificação e personalização do contato.</li>
              <li><strong>Telefone/WhatsApp</strong> — para que um especialista parceiro possa entrar em contato.</li>
              <li><strong>Dados de navegação</strong> — cookies técnicos para funcionamento do site e melhoria da experiência.</li>
            </ul>
            <p>
              <strong>Não coletamos</strong> dados sensíveis (origem racial, opinião política, dados de saúde, biometria, etc.).
            </p>

            <h2>4. Finalidade do Tratamento</h2>
            <p>Seus dados são utilizados exclusivamente para:</p>
            <ul>
              <li>Encaminhar sua solicitação a um especialista parceiro em utensílios de cozinha;</li>
              <li>Entrar em contato para fornecer orientação sobre panelas e utensílios seguros;</li>
              <li>Melhorar a experiência de navegação no portal.</li>
            </ul>

            <h2>5. Compartilhamento de Dados</h2>
            <p>
              Seus dados pessoais poderão ser compartilhados <strong>apenas</strong> com especialistas parceiros do portal, exclusivamente quando você solicitar contato através de nossos formulários. Não vendemos, comercializamos ou transferimos dados para terceiros não relacionados ao serviço solicitado, exceto quando exigido por lei.
            </p>

            <h2>6. Retenção dos Dados</h2>
            <p>
              Seus dados pessoais serão armazenados pelo período necessário para cumprir a finalidade para a qual foram coletados, ou até que você solicite a exclusão. Após o término do tratamento, os dados serão eliminados de forma segura.
            </p>

            <h2>7. Cookies</h2>
            <p>
              Utilizamos cookies essenciais para o funcionamento do site. Ao acessar o portal, você será notificado sobre o uso de cookies e poderá <strong>aceitar ou recusar</strong>. A recusa de cookies não impede a navegação, mas pode limitar algumas funcionalidades.
            </p>

            <h2>8. Seus Direitos (Art. 18 LGPD)</h2>
            <p>Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
            <ul>
              <li><strong>Confirmar</strong> a existência de tratamento dos seus dados;</li>
              <li><strong>Acessar</strong> os dados pessoais que mantemos sobre você;</li>
              <li><strong>Corrigir</strong> dados incompletos, inexatos ou desatualizados;</li>
              <li><strong>Solicitar anonimização, bloqueio ou eliminação</strong> de dados desnecessários ou em excesso;</li>
              <li><strong>Solicitar a portabilidade</strong> dos dados a outro prestador de serviço;</li>
              <li><strong>Revogar o consentimento</strong> a qualquer momento;</li>
              <li><strong>Obter informação</strong> sobre as entidades com as quais seus dados foram compartilhados.</li>
            </ul>
            <p>
              Para exercer qualquer destes direitos, envie um e-mail para <strong>contato@cozinhamaisconsciente.com.br</strong> com o assunto "Direitos LGPD".
            </p>

            <h2>9. Segurança dos Dados</h2>
            <p>
              Empregamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, perda, destruição ou qualquer forma de tratamento ilícito. Isso inclui criptografia em trânsito (HTTPS), acesso restrito aos dados e monitoramento contínuo.
            </p>

            <h2>10. Encarregado de Dados (DPO)</h2>
            <p>
              O responsável pelo tratamento de dados pessoais e ponto de contato com os titulares e a Autoridade Nacional de Proteção de Dados (ANPD) pode ser contactado pelo e-mail: <strong>contato@cozinhamaisconsciente.com.br</strong>.
            </p>

            <h2>11. Alterações nesta Política</h2>
            <p>
              Reservamo-nos o direito de atualizar esta política a qualquer momento. Alterações significativas serão comunicadas por meio de aviso no próprio portal. Recomendamos que consulte esta página periodicamente.
            </p>
            
            <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "var(--text-light)" }}>
              Esta política é efetiva a partir de Março de 2026.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
