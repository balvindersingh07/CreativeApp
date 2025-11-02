# --- CreativeApp Visual Smoke Test (v2.1) -----------------------------------
$ErrorActionPreference = "Stop"
$base = "http://localhost:5173"

# --- cross-platform browser detection (CI + local) ---
# 1) prefer explicit env
if ($Env:BROWSER -and (Test-Path $Env:BROWSER)) {
  $browser = $Env:BROWSER
} else {
  # 2) Windows paths (Edge/Chrome)
  $winCandidates = @(
    "$Env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "$Env:ProgramFiles(x86)\Microsoft\Edge\Application\msedge.exe",
    "$Env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "$Env:ProgramFiles(x86)\Google\Chrome\Application\chrome.exe",
    "$Env:LocalAppData\Google\Chrome\Application\chrome.exe"
  ) | Where-Object { # --- CreativeApp Visual Smoke Test (v2.1) -----------------------------------
$ErrorActionPreference = "Stop"
$base = "http://localhost:5173"

$edge = "$Env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
$chrome = "$Env:ProgramFiles\Google\Chrome\Application\chrome.exe"
$browser = if (Test-Path $edge) { $edge } elseif (Test-Path $chrome) { $chrome } else { $null }
if (-not $browser) { Write-Host "❌ Browser not found (Edge/Chrome)." -ForegroundColor Red; exit 1 }

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$outDir = Join-Path (Get-Location) "_screenshots\$stamp"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$pages = @(
  @{ name="recommendations"; url="$base/recommendations"; must=@("Recommendations","Request Stall") },
  @{ name="events";          url="$base/events";          must=@("Events") },
  @{ name="analytics";       url="$base/analytics";       must=@("Analytics") }
)

$report = @()
foreach ($p in $pages) {
  $name = $p.name; $url = $p.url
  $png = Join-Path $outDir "$name.png"
  $dom = Join-Path $outDir "$name.dom.html"

  Write-Host "`n📸 $name -> $url" -ForegroundColor Cyan
  $args = @(
    "--headless=new","--disable-gpu","--hide-scrollbars",
    "--disable-logging","--log-level=3",
    "--disable-features=Notifications,OptimizationHints,Translate,SitePerProcess",
    "--virtual-time-budget=8000","--window-size=1366,900",
    "--screenshot=$png","--dump-dom",$url
  )
  (& $browser @args 2>$null) | Out-File -FilePath $dom -Encoding UTF8

  $missing=@(); $ok=$false
  if (Test-Path $dom) {
    $html=Get-Content $dom -Raw
    foreach($m in $p.must){ if($html -notmatch [Regex]::Escape($m)){ $missing+=$m } }
    $ok=($missing.Count -eq 0)
  } else { $missing=@("DOM file missing") }

  $report += [pscustomobject]@{
    page=$name; url=$url; screenshot=(Test-Path $png);
    domExists=(Test-Path $dom); missing=($missing -join ", "); ok=$ok
  }
}

$reportPath = Join-Path $outDir "report.json"
$report | ConvertTo-Json -Depth 4 | Set-Content -Path $reportPath -Encoding UTF8

Write-Host ("`n📄 Report: {0}" -f $reportPath) -ForegroundColor DarkGray
$report | Format-Table page, ok, missing

if (($report | Where-Object { -not $_.ok }).Count -gt 0) { exit 1 } else { exit 0 }
 -and (Test-Path # --- CreativeApp Visual Smoke Test (v2.1) -----------------------------------
$ErrorActionPreference = "Stop"
$base = "http://localhost:5173"

$edge = "$Env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
$chrome = "$Env:ProgramFiles\Google\Chrome\Application\chrome.exe"
$browser = if (Test-Path $edge) { $edge } elseif (Test-Path $chrome) { $chrome } else { $null }
if (-not $browser) { Write-Host "❌ Browser not found (Edge/Chrome)." -ForegroundColor Red; exit 1 }

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$outDir = Join-Path (Get-Location) "_screenshots\$stamp"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$pages = @(
  @{ name="recommendations"; url="$base/recommendations"; must=@("Recommendations","Request Stall") },
  @{ name="events";          url="$base/events";          must=@("Events") },
  @{ name="analytics";       url="$base/analytics";       must=@("Analytics") }
)

$report = @()
foreach ($p in $pages) {
  $name = $p.name; $url = $p.url
  $png = Join-Path $outDir "$name.png"
  $dom = Join-Path $outDir "$name.dom.html"

  Write-Host "`n📸 $name -> $url" -ForegroundColor Cyan
  $args = @(
    "--headless=new","--disable-gpu","--hide-scrollbars",
    "--disable-logging","--log-level=3",
    "--disable-features=Notifications,OptimizationHints,Translate,SitePerProcess",
    "--virtual-time-budget=8000","--window-size=1366,900",
    "--screenshot=$png","--dump-dom",$url
  )
  (& $browser @args 2>$null) | Out-File -FilePath $dom -Encoding UTF8

  $missing=@(); $ok=$false
  if (Test-Path $dom) {
    $html=Get-Content $dom -Raw
    foreach($m in $p.must){ if($html -notmatch [Regex]::Escape($m)){ $missing+=$m } }
    $ok=($missing.Count -eq 0)
  } else { $missing=@("DOM file missing") }

  $report += [pscustomobject]@{
    page=$name; url=$url; screenshot=(Test-Path $png);
    domExists=(Test-Path $dom); missing=($missing -join ", "); ok=$ok
  }
}

$reportPath = Join-Path $outDir "report.json"
$report | ConvertTo-Json -Depth 4 | Set-Content -Path $reportPath -Encoding UTF8

Write-Host ("`n📄 Report: {0}" -f $reportPath) -ForegroundColor DarkGray
$report | Format-Table page, ok, missing

if (($report | Where-Object { -not $_.ok }).Count -gt 0) { exit 1 } else { exit 0 }
) }
  # 3) Linux paths (GitHub Actions Ubuntu)
  $nixCandidates = @("/usr/bin/google-chrome","/usr/bin/chromium","/usr/bin/chromium-browser") | Where-Object { Test-Path # --- CreativeApp Visual Smoke Test (v2.1) -----------------------------------
$ErrorActionPreference = "Stop"
$base = "http://localhost:5173"

$edge = "$Env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
$chrome = "$Env:ProgramFiles\Google\Chrome\Application\chrome.exe"
$browser = if (Test-Path $edge) { $edge } elseif (Test-Path $chrome) { $chrome } else { $null }
if (-not $browser) { Write-Host "❌ Browser not found (Edge/Chrome)." -ForegroundColor Red; exit 1 }

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$outDir = Join-Path (Get-Location) "_screenshots\$stamp"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$pages = @(
  @{ name="recommendations"; url="$base/recommendations"; must=@("Recommendations","Request Stall") },
  @{ name="events";          url="$base/events";          must=@("Events") },
  @{ name="analytics";       url="$base/analytics";       must=@("Analytics") }
)

$report = @()
foreach ($p in $pages) {
  $name = $p.name; $url = $p.url
  $png = Join-Path $outDir "$name.png"
  $dom = Join-Path $outDir "$name.dom.html"

  Write-Host "`n📸 $name -> $url" -ForegroundColor Cyan
  $args = @(
    "--headless=new","--disable-gpu","--hide-scrollbars",
    "--disable-logging","--log-level=3",
    "--disable-features=Notifications,OptimizationHints,Translate,SitePerProcess",
    "--virtual-time-budget=8000","--window-size=1366,900",
    "--screenshot=$png","--dump-dom",$url
  )
  (& $browser @args 2>$null) | Out-File -FilePath $dom -Encoding UTF8

  $missing=@(); $ok=$false
  if (Test-Path $dom) {
    $html=Get-Content $dom -Raw
    foreach($m in $p.must){ if($html -notmatch [Regex]::Escape($m)){ $missing+=$m } }
    $ok=($missing.Count -eq 0)
  } else { $missing=@("DOM file missing") }

  $report += [pscustomobject]@{
    page=$name; url=$url; screenshot=(Test-Path $png);
    domExists=(Test-Path $dom); missing=($missing -join ", "); ok=$ok
  }
}

$reportPath = Join-Path $outDir "report.json"
$report | ConvertTo-Json -Depth 4 | Set-Content -Path $reportPath -Encoding UTF8

Write-Host ("`n📄 Report: {0}" -f $reportPath) -ForegroundColor DarkGray
$report | Format-Table page, ok, missing

if (($report | Where-Object { -not $_.ok }).Count -gt 0) { exit 1 } else { exit 0 }
 }

  $browser = ($winCandidates + $nixCandidates) | Select-Object -First 1
}
if (-not $browser) {
  Write-Host "❌ Browser not found. Set BROWSER env or install Chrome/Chromium." -ForegroundColor Red
  exit 1
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$outDir = Join-Path (Get-Location) "_screenshots\$stamp"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$pages = @(
  @{ name="recommendations"; url="$base/recommendations"; must=@("Recommendations","Request Stall") },
  @{ name="events";          url="$base/events";          must=@("Events") },
  @{ name="analytics";       url="$base/analytics";       must=@("Analytics") }
)

$report = @()
foreach ($p in $pages) {
  $name = $p.name; $url = $p.url
  $png = Join-Path $outDir "$name.png"
  $dom = Join-Path $outDir "$name.dom.html"

  Write-Host "`n📸 $name -> $url" -ForegroundColor Cyan
  $args = @(
    "--headless=new","--disable-gpu","--hide-scrollbars",
    "--disable-logging","--log-level=3",
    "--disable-features=Notifications,OptimizationHints,Translate,SitePerProcess",
    "--virtual-time-budget=8000","--window-size=1366,900",
    "--screenshot=$png","--dump-dom",$url
  )
  (& $browser @args 2>$null) | Out-File -FilePath $dom -Encoding UTF8

  $missing=@(); $ok=$false
  if (Test-Path $dom) {
    $html=Get-Content $dom -Raw
    foreach($m in $p.must){ if($html -notmatch [Regex]::Escape($m)){ $missing+=$m } }
    $ok=($missing.Count -eq 0)
  } else { $missing=@("DOM file missing") }

  $report += [pscustomobject]@{
    page=$name; url=$url; screenshot=(Test-Path $png);
    domExists=(Test-Path $dom); missing=($missing -join ", "); ok=$ok
  }
}

$reportPath = Join-Path $outDir "report.json"
$report | ConvertTo-Json -Depth 4 | Set-Content -Path $reportPath -Encoding UTF8

Write-Host ("`n📄 Report: {0}" -f $reportPath) -ForegroundColor DarkGray
$report | Format-Table page, ok, missing

if (($report | Where-Object { -not $_.ok }).Count -gt 0) { exit 1 } else { exit 0 }

