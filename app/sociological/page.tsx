'use client'

import { useState, useEffect } from 'react'

export default function Sociological() {
  const [data, setData] = useState<any>(null)
  const [days, setDays] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/socio?days=${days}`)
      .then(r => r.json())
      .then(setData)
  }, [days])

  const analyses = {
    sudan: {
      title: "Sudan: Youth Bulge Cascade",
      paragraphs: [
        "Sudan presents the clearest example of demographic pressure overwhelming institutional capacity. With 12 million displaced persons and a median age of 19, the country operates under a classic youth bulge scenario where over 60% of the population is under 25. This demographic structure, combined with a birth rate of 4.4, creates a structural condition where the state must absorb approximately 400,000 new labor market entrants annually into an economy contracting at 42% GDP.",
        "The narrative fragility index reveals state legitimacy at 0.31, well below the 0.4 threshold for functional governance. Social cohesion at 0.29 indicates the fragmentation has moved beyond political disagreement into fundamental identity separation. Unlike Ukraine where high information warfare (0.91) occurs within a cohesive society, Sudan's low info warfare index (0.64) reflects the absence of a unified information space to contest. The conflict is not fought in narratives but in territorial control.",
        "Economic strain operates through three reinforcing mechanisms. First, inflation at 34% destroys savings and prevents capital formation. Second, youth unemployment at 38% means the demographic dividend becomes a demographic tax. Third, the GDP contraction eliminates the state's ability to buy social peace through subsidies. The composite economic fragility score of 1.14 is the highest in the field, exceeding even Myanmar under junta rule.",
        "Cultural memory in Sudan operates on a 35-year half-life, shorter than the regional average but with high generational grievance (0.78). This creates a dangerous pattern: trauma fades quickly enough that lessons are not transmitted, but grievance persists strongly enough to motivate recurrence. The Darfur genocide (2003-2005) sits at the edge of living memory for current combatants, creating a cohort that experienced violence as children and now perpetrates it as adults.",
        "The displacement cascade risk is active and self-reinforcing. Twelve million displaced represents 25% of the pre-war population, crossing the 15% threshold where displacement shifts from consequence to driver of conflict. Displaced populations create resource pressure in host areas, generate recruitment pools for armed groups, and sever traditional conflict-resolution mechanisms tied to land and community. The structural risk score of 42 indicates Sudan will remain in the top quartile of global conflict risk even if current fighting ceases, due to these underlying conditions."
      ]
    },
    sahel: {
      title: "Sahel AES: Demographic Detonation",
      paragraphs: [
        "The Sahel Alliance of Sahel States (AES) represents the most extreme youth bulge in the current conflict matrix. Median age of 17 combined with birth rate of 5.8 creates a population doubling time of approximately 24 years. In Niger, Mali, and Burkina Faso, the state faces the mathematical impossibility of providing education, employment, and governance to a population growing faster than institutional capacity can expand. This is not a policy failure but a structural condition.",
        "State legitimacy at 0.41 reflects the post-coup reality where military juntas have replaced elected governments across all three AES members. Paradoxically, this low legitimacy coexists with moderate social cohesion (0.47), higher than Sudan or Myanmar. The cohesion derives not from state institutions but from anti-French, anti-Western identity formation. The juntas survive not by providing services but by channeling demographic pressure into external grievance.",
        "The economic strain index of 0.58 appears moderate compared to Sudan's 1.14, but this masks a critical difference: the Sahel's economy was already informal and subsistence-based before the crisis. A 12% GDP contraction in a formal economy is recoverable; in the Sahel, it represents the collapse of the thin veneer of state economic presence, leaving populations to revert to pre-state survival strategies that are incompatible with modern borders.",
        "Information warfare index of 0.58 is the lowest in the field, indicating neither side possesses the capacity for sophisticated narrative operations. This creates a vacuum filled by Wagner Group and other proxy actors who provide both kinetic capability and information operations as a package. The low score does not indicate peace but rather the outsourcing of narrative control to external actors with longer time horizons.",
        "Cultural memory operates on a 40-year half-life with moderate grievance (0.69), but the key factor is identity polarization at 0.62 combined with youth bulge. Young populations with weak state attachment and strong group identity are uniquely susceptible to mobilization along ethnic and religious lines. The structural risk is compounded by climate change impacts on pastoral-agricultural boundaries, creating resource conflicts that map onto identity divisions. The latent potential score rises over time as tactical signals fade but demographic pressure increases."
      ]
    },
    armenia: {
      title: "Armenia-Azerbaijan: Memory Weaponization",
      paragraphs: [
        "Armenia represents the purest case of cultural memory as strategic weapon. With a trauma half-life of 100 years and generational grievance at 0.96, the highest in the field, the 1915 Armenian Genocide remains operationally relevant to current security policy. This is not historical memory but active deterrence doctrine. The persistence percentage remains at 99%+ even after 365 days, meaning unlike tactical signals that decay, cultural memory intensifies with time as it becomes mythologized.",
        "The displacement of 120,000 Armenians from Nagorno-Karabakh in 2023 created a demographic shock in a country of only 2.8 million. This 4.3% population increase through refugees represents a strain comparable to the United States absorbing 14 million refugees in a single year. The state legitimacy score of 0.58 reflects the government's inability to prevent the loss, while social cohesion at 0.54 shows the strain of integrating a traumatized population with maximal grievance.",
        "Economic strain appears moderate (GDP -3%, inflation 8%, youth unemployment 21%) but masks a critical vulnerability: Armenia's economy is heavily dependent on remittances and diaspora investment, both of which are sensitive to security perceptions. The structural risk derives not from current economic performance but from the economy's exposure to renewed conflict, creating a feedback loop where fear of war causes economic decline which increases war risk.",
        "Information warfare at 0.71 operates asymmetrically. Azerbaijan, with Turkish and Israeli drone technology, dominates the kinetic domain. Armenia compensates through narrative dominance in Western institutions, leveraging the genocide recognition campaign as a force multiplier. This creates the 'memory weaponization' pattern where cultural trauma is converted into diplomatic capital, arms procurement access, and deterrence signaling.",
        "The identity polarization score of 0.89, second only to Ukraine, indicates near-total separation between Armenian and Azerbaijani identity constructs. Unlike other conflicts where identities overlap or can be renegotiated, the Armenia-Azerbaijan divide is reinforced by mutually exclusive historical narratives, religious difference, and the zero-sum nature of territorial control in Nagorno-Karabakh. The composite socio risk of 3.8 combined with 100-year memory persistence creates the highest latent potential in the field. Tactical signals may fade to zero, but structural risk remains elevated for generations."
      ]
    },
    israel: {
      title: "Israel-Hezbollah: Trauma Half-Life Deterrence",
      paragraphs: [
        "Israel's sociological profile is dominated by the 70-year trauma half-life, referencing the Holocaust as the foundational security doctrine. Generational grievance at 0.93 creates a society where threat perception operates on a different timescale than adversary calculations. While Hezbollah plans in 5-10 year cycles, Israeli strategic culture plans in 70-100 year cycles, creating persistent mismatch in escalation thresholds and deterrence signaling.",
        "The demographic structure shows median age 30 and birth rate 2.9, significantly higher than regional peers and indicating a society optimized for long-term persistence rather than short-term efficiency. The 1 million displaced from northern Israel represents 10% of the population, but unlike Sudan where displacement indicates state failure, here it indicates state capacity to evacuate and sustain displaced populations, maintaining social cohesion at 0.61 despite prolonged displacement.",
        "State legitimacy at 0.65 reflects the ongoing political crisis and judicial reform protests, yet this is deceptive. Israeli state legitimacy is bifurcated: low for domestic governance, high for security provision. The population may distrust the government but trusts the security establishment, creating a unique condition where the state can lose political legitimacy without losing operational capacity.",
        "Information warfare index of 0.88 is second only to Ukraine, reflecting the global narrative contest over the Gaza and Lebanon operations. Unlike Ukraine where info warfare supports kinetic operations, in Israel the information domain has become partially decoupled from kinetic reality, with global opinion formation occurring independently of battlefield outcomes. This creates a structural condition where military victory does not translate to strategic success.",
        "Economic strain is minimal compared to other conflicts (GDP -8%, inflation 4%, youth unemployment 11%), reflecting Israel's advanced economy and US support. However, the economic fragility score of 0.23 masks a critical vulnerability: the economy's dependence on high-tech exports and foreign investment, both sensitive to prolonged conflict and international isolation. The cultural memory persistence of 100% at all timescales means deterrence is not calculated on current capabilities but on historical trauma, making de-escalation structurally difficult regardless of tactical conditions."
      ]
    },
    ukraine: {
      title: "Ukraine-Russia: High-Velocity Decay",
      paragraphs: [
        "Ukraine exhibits the fastest tactical decay in the field with an 8-day half-life, reflecting the high-velocity information environment and rapid equipment attrition. This creates a unique sociological condition where the population experiences conflict time at an accelerated rate compared to other wars. A month in Ukraine contains more tactical events than a year in the Sahel, producing psychological and social effects that standard conflict models do not capture.",
        "Demographically, Ukraine presents an inverted pyramid: median age 41, birth rate 1.2, and 6.5 million displaced. This is not a youth bulge but a youth deficit, creating a structural condition where the state must fight a prolonged war with a shrinking, aging population. The displacement cascade is active but differs from Sudan: Ukrainian refugees are absorbed by EU states with capacity, preventing the destabilizing effects seen in the Sahel, but creating long-term demographic loss for Ukraine.",
        "State legitimacy at 0.72 is the highest among active conflicts, reflecting wartime rally effects and effective governance under pressure. Social cohesion at 0.68 indicates a society that has maintained unity despite massive stress. This combination of high legitimacy and high info warfare (0.91) creates a resilient information environment where Russian narratives struggle to penetrate, unlike in the Sahel where low capacity creates narrative vacuums.",
        "Economic strain shows GDP contraction of 29% and inflation at 12%, severe but mitigated by $100+ billion in annual external support. The economic fragility score of 0.6 is moderate because the economy has been effectively externalized to Western donors. This creates a structural dependency where Ukraine's ability to sustain conflict is decoupled from its domestic economic performance, a condition unique in the field.",
        "Cultural memory operates on a 25-year half-life, the shortest among major conflicts, reflecting the recency of the 2014 and 2022 invasions. Generational grievance at 0.84 is high but not maximal, indicating the trauma is still being processed rather than mythologized. Identity polarization at 0.91 is maximal, reflecting the civilizational framing of the conflict. The combination of fast tactical decay, short memory half-life, and high polarization creates a volatile structure where the conflict can escalate or de-escalate rapidly based on external support flows, unlike Armenia or Israel where cultural memory locks in hostility for generations."
      ]
    }
  }

  const selectedAnalysis = selected ? analyses[selected as keyof typeof analyses] : null

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="text-[#ff9500] font-mono text-sm mb-2">02 / SOCIOLOGICAL COMPLEX</div>
          <h1 className="text-4xl font-mono font-bold mb-2">Structural Risk Analysis</h1>
          <p className="text-gray-600">Demographic pressure, narrative fragility, cultural memory. 25-100 year half-lives.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-black/40 border border-gray-800 rounded-lg p-6 mb-6">
              <h3 className="font-mono text-sm text-gray-400 mb-4">SELECT CONFLICT FOR DEEP ANALYSIS</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.keys(analyses).map(key => (
                  <button
                    key={key}
                    onClick={() => setSelected(key)}
                    className={`p-4 rounded border text-left transition-all ${
                      selected === key 
                        ? 'bg-[#ff9500]/20 border-[#ff9500] text-white' 
                        : 'bg-black/30 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="font-mono text-sm capitalize">{key}</div>
                    <div className="text-[10px] mt-1 opacity-60">5 paragraph analysis</div>
                  </button>
                ))}
              </div>
            </div>

            {selectedAnalysis && (
              <div className="bg-black/30 border border-gray-800 rounded-lg p-8">
                <h2 className="text-2xl font-mono font-bold mb-6 text-[#ff9500]">{selectedAnalysis.title}</h2>
                <div className="space-y-6">
                  {selectedAnalysis.paragraphs.map((para, i) => (
                    <p key={i} className="text-gray-300 leading-relaxed">
                      <span className="text-[#ff9500] font-mono text-sm mr-2">[{i+1}]</span>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {!selectedAnalysis && (
              <div className="bg-black/30 border border-gray-800 rounded-lg p-12 text-center">
                <div className="text-gray-600 font-mono">Select a conflict above to view 5-paragraph structural risk analysis</div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 border border-gray-800 rounded-lg p-5">
              <h3 className="font-mono text-xs text-gray-500 mb-3">THEORY</h3>
              <div className="space-y-3 text-xs text-gray-400 leading-relaxed">
                <p><span className="text-white">Asymmetric Decay:</span> Tactical signals fade in days/weeks. Sociological structures persist decades. A ceasefire reduces tactical weight to 10% in 30 days. Cultural memory remains at 95%+.</p>
                <p><span className="text-white">Latent Conflict:</span> High structural risk + low tactical weight = dormant but primed. Armenia at day 90: 15% tactical, 99% memory, will reignite with trigger.</p>
                <p><span className="text-white">Youth Bulge:</span> Median age &lt;25 + birth rate &gt;4.0 creates structural unemployment. State cannot absorb cohort. Violence becomes employment.</p>
              </div>
            </div>

            <div className="bg-black/40 border border-gray-800 rounded-lg p-5">
              <h3 className="font-mono text-xs text-gray-500 mb-3">KEY METRICS</h3>
              <div className="space-y-2 text-[11px] font-mono">
                <div className="flex justify-between"><span className="text-gray-600">Trauma HL Range</span><span className="text-[#00d4ff]">25-100 years</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Tactical HL Range</span><span className="text-[#ff3b30]">8-90 days</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Decay Ratio</span><span className="text-white">~1000:1</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Memory Weapons</span><span className="text-[#ff9500]">Armenia, Israel</span></div>
              </div>
            </div>

            {data && (
              <div className="bg-black/40 border border-gray-800 rounded-lg p-5">
                <h3 className="font-mono text-xs text-gray-500 mb-3">CURRENT FIELD</h3>
                <div className="space-y-2">
                  {data.field_analysis?.youth_bulge_zones?.length > 0 && (
                    <div className="text-[11px]">
                      <span className="text-red-400 font-mono">YOUTH BULGE:</span>
                      <span className="text-gray-400 ml-2">{data.field_analysis.youth_bulge_zones.join(', ')}</span>
                    </div>
                  )}
                  {data.field_analysis?.memory_weapons?.length > 0 && (
                    <div className="text-[11px]">
                      <span className="text-purple-400 font-mono">MEMORY:</span>
                      <span className="text-gray-400 ml-2">{data.field_analysis.memory_weapons.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
