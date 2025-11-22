// 5 PROMPTS MỚI ĐỂ THÊM VÀO barChartTopic
// Thêm các prompts này SAU prompt 'p1-bar-chart' hiện tại
// File này là template, không được import trực tiếp

export const barChartPrompts = [
    {
      id: 'p2-bar-chart',
      title: 'Energy Consumption by Source',
      titleTranslation: 'Tiêu thụ năng lượng theo nguồn',
      prompt: 'The bar chart illustrates energy consumption in terawatt-hours across four different energy sources (Coal, Natural Gas, Nuclear, Renewable) in 2023. It compares energy usage patterns across these 4 categories.',
      promptTranslation: 'Biểu đồ cột minh họa tiêu thụ năng lượng tính bằng terawatt-giờ qua bốn nguồn năng lượng khác nhau (Than, Khí đốt tự nhiên, Hạt nhân, Tái tạo) vào năm 2023. Nó so sánh các mô hình sử dụng năng lượng qua 4 danh mục này.',
      question: 'The bar chart illustrates energy consumption in terawatt-hours across four different energy sources in 2023.',
      questionTranslation: 'Biểu đồ cột minh họa tiêu thụ năng lượng tính bằng terawatt-giờ qua bốn nguồn năng lượng khác nhau vào năm 2023.',
      type: 'Bar Chart',
      difficulty: 'Intermediate',
      category: 'Energy',
      level: 'Intermediate',
      wordCount: 150,
      timeLimit: 20,
      keywords: ['energy', 'consumption', 'sources', 'terawatt-hours', 'comparison'],
      keywordsTranslation: ['năng lượng', 'tiêu thụ', 'nguồn', 'terawatt-giờ', 'so sánh'],
      requirements: [
        'Describe the main trends',
        'Compare the data',
        'Write at least 150 words',
        'Use appropriate vocabulary'
      ],
      requirementsTranslation: [
        'Mô tả xu hướng chính',
        'So sánh dữ liệu',
        'Viết ít nhất 150 từ',
        'Sử dụng từ vựng phù hợp'
      ]
    },
    {
      id: 'p3-bar-chart',
      title: 'Student Enrollment by Major',
      titleTranslation: 'Tuyển sinh sinh viên theo chuyên ngành',
      prompt: 'The bar chart displays student enrollment numbers across six university majors (Engineering, Business, Medicine, Arts, Science, Law) in the academic year 2023-2024. It compares enrollment figures across these 6 categories.',
      promptTranslation: 'Biểu đồ cột hiển thị số lượng sinh viên tuyển sinh qua sáu chuyên ngành đại học (Kỹ thuật, Kinh doanh, Y khoa, Nghệ thuật, Khoa học, Luật) trong năm học 2023-2024. Nó so sánh số liệu tuyển sinh qua 6 danh mục này.',
      question: 'The bar chart displays student enrollment numbers across six university majors in the academic year 2023-2024.',
      questionTranslation: 'Biểu đồ cột hiển thị số lượng sinh viên tuyển sinh qua sáu chuyên ngành đại học trong năm học 2023-2024.',
      type: 'Bar Chart',
      difficulty: 'Intermediate',
      category: 'Education',
      level: 'Intermediate',
      wordCount: 150,
      timeLimit: 20,
      keywords: ['students', 'enrollment', 'majors', 'university', 'comparison'],
      keywordsTranslation: ['sinh viên', 'tuyển sinh', 'chuyên ngành', 'đại học', 'so sánh'],
      requirements: [
        'Describe the main trends',
        'Compare the data',
        'Write at least 150 words',
        'Use appropriate vocabulary'
      ],
      requirementsTranslation: [
        'Mô tả xu hướng chính',
        'So sánh dữ liệu',
        'Viết ít nhất 150 từ',
        'Sử dụng từ vựng phù hợp'
      ]
    },
    {
      id: 'p4-bar-chart',
      title: 'Smartphone Sales by Brand',
      titleTranslation: 'Doanh số smartphone theo thương hiệu',
      prompt: 'The bar chart presents smartphone sales in millions of units for five major brands (Brand A, Brand B, Brand C, Brand D, Brand E) during Q4 2023. It compares market performance across these 5 categories.',
      promptTranslation: 'Biểu đồ cột trình bày doanh số smartphone tính bằng triệu đơn vị cho năm thương hiệu lớn (Thương hiệu A, B, C, D, E) trong quý 4 năm 2023. Nó so sánh hiệu suất thị trường qua 5 danh mục này.',
      question: 'The bar chart presents smartphone sales in millions of units for five major brands during Q4 2023.',
      questionTranslation: 'Biểu đồ cột trình bày doanh số smartphone tính bằng triệu đơn vị cho năm thương hiệu lớn trong quý 4 năm 2023.',
      type: 'Bar Chart',
      difficulty: 'Intermediate',
      category: 'Business',
      level: 'Intermediate',
      wordCount: 150,
      timeLimit: 20,
      keywords: ['smartphone', 'sales', 'brands', 'market', 'comparison'],
      keywordsTranslation: ['smartphone', 'doanh số', 'thương hiệu', 'thị trường', 'so sánh'],
      requirements: [
        'Describe the main trends',
        'Compare the data',
        'Write at least 150 words',
        'Use appropriate vocabulary'
      ],
      requirementsTranslation: [
        'Mô tả xu hướng chính',
        'So sánh dữ liệu',
        'Viết ít nhất 150 từ',
        'Sử dụng từ vựng phù hợp'
      ]
    },
    {
      id: 'p5-bar-chart',
      title: 'Tourist Arrivals by Region',
      titleTranslation: 'Lượng khách du lịch theo khu vực',
      prompt: 'The bar chart depicts international tourist arrivals in millions across four regions (Asia, Europe, Americas, Africa) in 2023. It compares tourism patterns across these 4 categories.',
      promptTranslation: 'Biểu đồ cột mô tả lượng khách du lịch quốc tế tính bằng triệu người qua bốn khu vực (Châu Á, Châu Âu, Châu Mỹ, Châu Phi) vào năm 2023. Nó so sánh các mô hình du lịch qua 4 danh mục này.',
      question: 'The bar chart depicts international tourist arrivals in millions across four regions in 2023.',
      questionTranslation: 'Biểu đồ cột mô tả lượng khách du lịch quốc tế tính bằng triệu người qua bốn khu vực vào năm 2023.',
      type: 'Bar Chart',
      difficulty: 'Intermediate',
      category: 'Tourism',
      level: 'Intermediate',
      wordCount: 150,
      timeLimit: 20,
      keywords: ['tourists', 'arrivals', 'regions', 'international', 'comparison'],
      keywordsTranslation: ['khách du lịch', 'lượng khách', 'khu vực', 'quốc tế', 'so sánh'],
      requirements: [
        'Describe the main trends',
        'Compare the data',
        'Write at least 150 words',
        'Use appropriate vocabulary'
      ],
      requirementsTranslation: [
        'Mô tả xu hướng chính',
        'So sánh dữ liệu',
        'Viết ít nhất 150 từ',
        'Sử dụng từ vựng phù hợp'
      ]
    },
    {
      id: 'p6-bar-chart',
      title: 'Carbon Emissions by Sector',
      titleTranslation: 'Phát thải carbon theo ngành',
      prompt: 'The bar chart compares carbon dioxide emissions in million tonnes across five economic sectors (Transportation, Industry, Agriculture, Residential, Commercial) in 2023. It compares emission levels across these 5 categories.',
      promptTranslation: 'Biểu đồ cột so sánh phát thải carbon dioxide tính bằng triệu tấn qua năm ngành kinh tế (Giao thông, Công nghiệp, Nông nghiệp, Dân cư, Thương mại) vào năm 2023. Nó so sánh mức phát thải qua 5 danh mục này.',
      question: 'The bar chart compares carbon dioxide emissions in million tonnes across five economic sectors in 2023.',
      questionTranslation: 'Biểu đồ cột so sánh phát thải carbon dioxide tính bằng triệu tấn qua năm ngành kinh tế vào năm 2023.',
      type: 'Bar Chart',
      difficulty: 'Advanced',
      category: 'Environment',
      level: 'Advanced',
      wordCount: 150,
      timeLimit: 20,
      keywords: ['carbon', 'emissions', 'sectors', 'environment', 'comparison'],
      keywordsTranslation: ['carbon', 'phát thải', 'ngành', 'môi trường', 'so sánh'],
      requirements: [
        'Describe the main trends',
        'Compare the data',
        'Write at least 150 words',
        'Use appropriate vocabulary'
      ],
      requirementsTranslation: [
        'Mô tả xu hướng chính',
        'So sánh dữ liệu',
        'Viết ít nhất 150 từ',
        'Sử dụng từ vựng phù hợp'
      ]
    }
];
