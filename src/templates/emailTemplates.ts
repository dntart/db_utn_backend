const createTemplates = (message: string) => {
return `
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f4f6f8;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #1e293b;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 24px;
        color: #333333;
        line-height: 1.6;
      }
      .content p {
        margin-bottom: 16px;
      }
      .footer {
        background-color: #f1f5f9;
        text-align: center;
        padding: 12px;
        font-size: 12px;
        color: #64748b;
      }
      .highlight {
        color: #2563eb;
        font-weight: bold;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <h1>Tienda de Productos Dante</h1>
      </div>

      <div class="content">
        <p>Hola 👋</p>

        <p>
          Has recibido un nuevo mensaje desde la
          <span class="highlight">tienda de productos</span>.
        </p>

        <p>
          <strong>Mensaje:</strong><br />
          ${message}
        </p>

        <p>
          Por favor, revisá la información y respondé cuando sea necesario.
        </p>
      </div>

      <div class="footer">
        © ${new Date().getFullYear()} Tienda de Productos Dante · Backend
      </div>
    </div>
  </body>
</html>
`
}
export default createTemplates