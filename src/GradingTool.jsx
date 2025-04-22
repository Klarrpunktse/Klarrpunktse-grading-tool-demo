import React, { useState } from "react";
import {
  Check,
  Github,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  BookOpen,
  FileText,
  Copy,
  Clipboard,
  MessageSquarePlus,
  Zap,
  Wand2,
} from "lucide-react";

const GradingTool = () => {
  const [repoUrl, setRepoUrl] = useState(
    "https://github.com/student/assignment-repo"
  );
  const [selectedGrade, setSelectedGrade] = useState("");
  const [instructions, setInstructions] = useState(
    "Build a web application that displays a list of products from an API. The application should include filtering, sorting, and pagination. Use React.js for the frontend and demonstrate proper component structure."
  );
  const [additionalInstructions, setAdditionalInstructions] = useState(
    "Focus on code organization and responsive design."
  );
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("issues");
  const [feedback, setFeedback] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [personalityLevel, setPersonalityLevel] = useState(92);

  const mockIssues = [
    {
      title: "Component structure needs improvement",
      description:
        "The components are too tightly coupled and responsibilities are not clearly separated.",
      severity: "medium",
      code: `// Current approach in App.js
function ProductList() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('name');
  const [page, setPage] = useState(1);
  
  // Filtering, sorting, and data fetching all in one component
  // ...
}`,
    },
    {
      title: "Missing error handling",
      description:
        "API calls lack proper error handling, leading to poor user experience when network issues occur.",
      severity: "high",
      code: `// Current code
fetch('https://api.example.com/products')
  .then(response => response.json())
  .then(data => setProducts(data));
  
// Should include error handling
fetch('https://api.example.com/products')
  .then(response => {
    if (!response.ok) throw new Error('Network response not ok');
    return response.json();
  })
  .then(data => setProducts(data))
  .catch(error => {
    setError(error.message);
    setLoading(false);
  });`,
    },
    {
      title: "Responsive design implementation is incomplete",
      description:
        "The application is not properly optimized for mobile devices.",
      severity: "medium",
      code: `// Current CSS
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

// Recommended improvements
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}`,
    },
  ];

  const mockStrengths = [
    {
      title: "Good application of React hooks",
      description:
        "Effective use of useState and useEffect for state management and side effects.",
      code: `// Well implemented hooks
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  fetchProducts()
    .then(data => {
      setProducts(data);
      setLoading(false);
    });
}, [currentPage]);`,
    },
    {
      title: "Clean pagination implementation",
      description:
        "Pagination is implemented in a reusable way with good UX considerations.",
      code: `// Well-structured pagination component
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      
      {/* Page number indicators */}
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={currentPage === i + 1 ? 'active' : ''}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      
      <button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}`,
    },
  ];

  const handleAnalyze = () => {
    setAnalysisLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisLoading(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  const getRecommendedGrade = () => {
    return "G";
  };

  const getSeverityColor = (severity) => {
    if (severity === "high") return "text-red-500";
    if (severity === "medium") return "text-amber-500";
    return "text-blue-500";
  };

  const getSeverityIcon = (severity) => {
    if (severity === "high") return <AlertCircle className="w-5 h-5 mr-2" />;
    if (severity === "medium") return <AlertCircle className="w-5 h-5 mr-2" />;
    return <AlertCircle className="w-5 h-5 mr-2" />;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">AI Assistant Grading Tool</h1>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Input panel */}
        <div className="w-1/3 bg-white p-4 border-r overflow-y-auto">
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">
              Assignment Information
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub Repository
              </label>
              <div className="flex">
                <div className="bg-gray-100 p-2 flex items-center rounded-l-md border border-r-0 border-gray-300">
                  <Github className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assignment Instructions
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Instructions (Optional)
              </label>
              <textarea
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md h-20 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={analysisLoading}
              className={`w-full py-2 px-4 rounded-md font-medium text-white ${
                analysisLoading
                  ? "bg-blue-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {analysisLoading ? "Analyzing..." : "Analyze Repository"}
            </button>
          </div>

          {analysisComplete && (
            <div className="border-t pt-4 mt-2">
              <h2 className="font-semibold text-lg mb-3">Assessment</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  AI Recommended Grade
                </label>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-between">
                  <div>
                    <span className="font-medium text-blue-800">
                      {getRecommendedGrade()}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      (Godkänt)
                    </span>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    For reference only
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Assign final grade in your learning platform
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">
                  Teacher Profile
                </h3>
                <div className="bg-white border border-gray-200 rounded-md p-3">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <span className="ml-2 font-medium">Maria Andersson</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-24">
                        Feedback style:
                      </span>
                      <span className="font-medium">Encouraging & Direct</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-24">
                        Language level:
                      </span>
                      <span className="font-medium">Advanced</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-24">Focus areas:</span>
                      <span className="font-medium">Code quality, Testing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main panel - Analysis results */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!analysisComplete ? (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center p-8">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-medium text-gray-600 mb-2">
                  No Analysis Yet
                </h2>
                <p className="text-gray-500 max-w-md">
                  Enter the GitHub repository URL and assignment instructions,
                  then click "Analyze Repository" to start the assessment.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="bg-white border-b">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("issues")}
                    className={`px-4 py-3 font-medium text-sm border-b-2 ${
                      activeTab === "issues"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Issues ({mockIssues.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("strengths")}
                    className={`px-4 py-3 font-medium text-sm border-b-2 ${
                      activeTab === "strengths"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Strengths ({mockStrengths.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("feedback")}
                    className={`px-4 py-3 font-medium text-sm border-b-2 ${
                      activeTab === "feedback"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Create Feedback
                  </button>
                </div>
              </div>

              {/* Tab content */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {activeTab === "issues" && (
                  <div className="space-y-4">
                    {mockIssues.map((issue, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                      >
                        <div className="p-4 border-b bg-gray-50">
                          <div className="flex items-start">
                            <div
                              className={`mt-0.5 ${getSeverityColor(
                                issue.severity
                              )}`}
                            >
                              {getSeverityIcon(issue.severity)}
                            </div>
                            <div>
                              <h3 className="font-medium">{issue.title}</h3>
                              <p className="text-gray-600 mt-1 text-sm">
                                {issue.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-b-lg text-sm">
                          <pre className="text-green-400 whitespace-pre-wrap">
                            {issue.code}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "strengths" && (
                  <div className="space-y-4">
                    {mockStrengths.map((strength, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                      >
                        <div className="p-4 border-b bg-gray-50">
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium">{strength.title}</h3>
                              <p className="text-gray-600 mt-1 text-sm">
                                {strength.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-b-lg text-sm">
                          <pre className="text-green-400 whitespace-pre-wrap">
                            {strength.code}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "feedback" && (
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">
                        Craft Personalized Feedback
                      </h3>
                      <div className="flex space-x-2">
                        <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                          <MessageSquarePlus className="w-4 h-4 mr-1" />
                          Templates
                        </button>
                        <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                          <Wand2 className="w-4 h-4 mr-1" />
                          Customize Style
                        </button>
                      </div>
                    </div>

                    <div className="mb-4 border border-gray-200 rounded-md p-3 bg-blue-50">
                      <div className="flex items-center mb-2">
                        <Zap className="w-4 h-4 text-blue-600 mr-2" />
                        <h4 className="font-medium text-blue-800">
                          AI Quick Actions
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button className="text-xs bg-white border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-50">
                          Generate draft in my style
                        </button>
                        <button className="text-xs bg-white border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-50">
                          Summarize key issues
                        </button>
                        <button className="text-xs bg-white border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-50">
                          Add suggested improvements
                        </button>
                        <button className="text-xs bg-white border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-50">
                          Highlight strengths
                        </button>
                        <button className="text-xs bg-white border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-50">
                          Suggest next steps
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Feedback Content
                        </label>
                        <div className="flex items-center text-xs">
                          <span className="text-gray-500">
                            Personality match:{" "}
                          </span>
                          <span className="ml-1 text-green-600 font-medium">
                            {personalityLevel}%
                          </span>
                          <div className="relative ml-2 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full bg-green-500"
                              style={{ width: `${personalityLevel}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <textarea
                        value={
                          feedback ||
                          "Hej Viktor,\n\nJag har gått igenom din inlämning av produktlistningsapplikationen och jag är överlag nöjd med ditt arbete! Du har visat god förståelse för React och hur man strukturerar en modern webbapplikation.\n\nDet jag särskilt gillar är din implementering av pagination-komponenten. Den är välstrukturerad och återanvändbar, vilket är exakt vad vi eftersträvar i professionell kodutveckling. Din användning av React hooks är också exemplarisk och visar att du förstår de moderna koncepten.\n\nDet finns dock några områden där du kan förbättra koden:\n\n1. Komponentstrukturen behöver ses över. Just nu har du för mycket funktionalitet i en och samma komponent, vilket gör koden svårläst och svårare att underhålla. Försök separera ansvarsområden tydligare.\n\n2. Felhantering saknas i dina API-anrop. Detta är viktigt för att ge användarna en bra upplevelse även när något går fel.\n\n3. Den responsiva designen är inte helt komplett. Applikationen fungerar inte optimalt på mobila enheter, vilket var ett av kraven.\n\nTotalt sett visar du god förståelse för materialet och jag uppskattar din insats. Bedömningen blir Godkänt (G). Med de förbättringar jag nämnt ovan hade du kunnat nå ett VG.\n\nHälsningar,\nMaria"
                        }
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md h-64 focus:ring-blue-500 focus:border-blue-500 font-normal"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button className="py-2 px-3 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 flex items-center">
                          <Copy className="w-4 h-4 mr-1" />
                          Save Draft
                        </button>
                        <button className="py-2 px-3 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 flex items-center">
                          <Wand2 className="w-4 h-4 mr-1" />
                          Regenerate
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          setIsCopied(true);
                          setTimeout(() => setIsCopied(false), 2000);
                        }}
                        className="py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 flex items-center"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Clipboard className="w-4 h-4 mr-2" />
                            Copy to Clipboard
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradingTool;
