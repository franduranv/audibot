"""
AudiBot - Analizador de Riesgo Fiscal
Genera reporte de riesgo de auditoría SAT para una PyME
"""
from anthropic import Anthropic

client = Anthropic()

def analizar_riesgo_fiscal(datos_empresa: dict) -> str:
    """
    Analiza el riesgo fiscal de una empresa usando Claude
    
    datos_empresa: dict con información fiscal de la empresa
    """
    prompt = f"""Eres AudiBot, un agente de compliance fiscal para PyMEs mexicanas.
    
Analiza el siguiente perfil fiscal y genera un reporte de riesgo de auditoría SAT:

Empresa: {datos_empresa.get('nombre', 'PyME')}
RFC: {datos_empresa.get('rfc', 'N/A')}
Régimen fiscal: {datos_empresa.get('regimen', 'N/A')}
Ingresos declarados: {datos_empresa.get('ingresos', 'N/A')}
Número de proveedores: {datos_empresa.get('num_proveedores', 'N/A')}
Sectores de actividad: {datos_empresa.get('sector', 'N/A')}

Genera un reporte con:
1. Nivel de riesgo general (BAJO/MEDIO/ALTO/CRÍTICO)
2. Los 3 principales factores de riesgo identificados
3. Acciones preventivas recomendadas
4. Prioridad de atención (urgente/normal/preventivo)

Responde en español, de forma clara y directa para el dueño de una PyME."""

    mensaje = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    return mensaje.content[0].text

if __name__ == "__main__":
    empresa_demo = {
        "nombre": "Demo PyME SA de CV",
        "rfc": "DPY200101ABC",
        "regimen": "601 - General de Ley Personas Morales",
        "ingresos": "$2,500,000 MXN anuales",
        "num_proveedores": "15",
        "sector": "Servicios de consultoría"
    }
    print(analizar_riesgo_fiscal(empresa_demo))
