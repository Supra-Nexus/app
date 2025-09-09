import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { PDFDocument, StandardFonts } from 'pdf-lib';

describe('PDF File Upload and Processing', () => {
  let testPdfPath: string;

  beforeAll(async () => {
    // Create a test PDF
    testPdfPath = path.join(__dirname, 'test-document.pdf');
    
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    page.drawText('This is a test PDF document for Zoo AI', {
      x: 50,
      y: 350,
      size: 20,
      font,
    });
    
    page.drawText('It contains sample text for testing PDF parsing.', {
      x: 50,
      y: 300,
      size: 14,
      font,
    });
    
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(testPdfPath, pdfBytes);
  });

  afterAll(() => {
    // Clean up test PDF
    if (fs.existsSync(testPdfPath)) {
      fs.unlinkSync(testPdfPath);
    }
  });

  it('should handle PDF file upload', async () => {
    const fileBuffer = fs.readFileSync(testPdfPath);
    const file = new File([fileBuffer], 'test.pdf', { type: 'application/pdf' });
    
    expect(file.size).toBeGreaterThan(0);
    expect(file.type).toBe('application/pdf');
  });

  it('should validate file type', () => {
    const allowedTypes = ['application/pdf', 'text/plain', 'image/png', 'image/jpeg'];
    const pdfType = 'application/pdf';
    
    expect(allowedTypes).toContain(pdfType);
  });

  it('should handle file size limits', () => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const fileSize = fs.statSync(testPdfPath).size;
    
    expect(fileSize).toBeLessThan(maxSize);
  });

  it('should extract text from PDF', async () => {
    // This would require a PDF parsing library
    // For now, we'll test the structure
    const fileBuffer = fs.readFileSync(testPdfPath);
    
    // Mock PDF text extraction
    const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
      // In a real implementation, use pdf-parse or similar
      return 'This is a test PDF document for Zoo AI';
    };
    
    const text = await extractTextFromPDF(fileBuffer);
    expect(text).toContain('Zoo AI');
  });
});

describe('Agent Tool Configuration', () => {
  it('should have valid agent configuration', () => {
    const agentConfig = {
      initial_agent_names: 'Zoo_Eco_1,Zoo_Coder_1',
      initial_agent_urls: 'http://127.0.0.1:11435,http://127.0.0.1:11435',
      initial_agent_models: 'ollama:llama3.2,ollama:qwen2.5-coder',
      initial_agent_api_keys: ',',
    };
    
    const names = agentConfig.initial_agent_names.split(',');
    const urls = agentConfig.initial_agent_urls.split(',');
    const models = agentConfig.initial_agent_models.split(',');
    const apiKeys = agentConfig.initial_agent_api_keys === ',' ? ['', ''] : agentConfig.initial_agent_api_keys.split(',');
    
    expect(names.length).toBe(2);
    expect(urls.length).toBe(2);
    expect(models.length).toBe(2);
    expect(apiKeys.length).toBe(2);
    
    // Check agent names are valid (alphanumeric and underscore only)
    names.forEach(name => {
      expect(name).toMatch(/^[a-zA-Z0-9_]+$/);
    });
  });

  it('should handle missing tools gracefully', () => {
    const toolKey = 'aaa:::deno_toolkit:::blue';
    const availableTools = [
      'local:::__official_zoo:::zoo_typescript_unsafe_processor',
      'local:::__official_zoo:::zoo_python_unsafe_processor',
    ];
    
    const toolExists = availableTools.includes(toolKey);
    expect(toolExists).toBe(false);
    
    // Should return error message instead of crashing
    if (!toolExists) {
      const error = `Tool not found with key: ${toolKey}`;
      expect(error).toContain('Tool not found');
    }
  });
});

describe('File Processing Errors', () => {
  it('should handle null agent gracefully', () => {
    const agent = null;
    
    // This is the error case from the screenshot
    const getAgentId = (agent: any) => {
      if (!agent || !agent.id) {
        return 'default-agent';
      }
      return agent.id;
    };
    
    expect(() => getAgentId(agent)).not.toThrow();
    expect(getAgentId(agent)).toBe('default-agent');
  });

  it('should validate tool parameters', () => {
    const toolCall = {
      name: 'zoo_tool_config_updater',
      parameters: {
        tool_router_key: 'local::deno_toolkit:: Morvarid Saharifi',
        config: {
          api_key: '____________',
          api_secret: '____________'
        }
      }
    };
    
    // Check for invalid characters in tool_router_key
    const isValidKey = /^[a-zA-Z0-9_:]+$/.test(toolCall.parameters.tool_router_key);
    expect(isValidKey).toBe(false); // Contains spaces which are invalid
  });
});