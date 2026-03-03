import { getCaretakers } from '@/actions/server/caretakers';
import React from 'react';
import { MdArrowForward, MdStar } from 'react-icons/md';
import ServicesCard from '../../Card/ServicesCard';

// const caretakers = [
//   {
//     name: "Sarah M.",
//     title: "Certified Pediatric Nurse • 5y exp",
//     price: "$25",
//     rating: "4.9",
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmfKNear-LixPD0Y9GrJtR4x2dN5ShGJ9c4S5tfWWNETqpCEfm5Dn7dsEp-0YtEzR8VshVBM-3UrQMRRK40X_F6ALilU35a3-76R_QQL7s_WslEvmtGakF5YbwP8lkrO3LtZ75rjB6BvFpw7FMCFAUYtP0JX8qkX8Oa6D_bPJ_O7_p-VG9z5QwWwPqmZwZobOK9CqMGJnZeQ_vjJj2wGV6pDhIcQbQKuehzIaDUlQywMNa-1fZfrlJgz3gjcC1_0pE8L0VjazEpDZh",
//   },
//   {
//     name: "David R.",
//     title: "Elderly Support Expert • 8y exp",
//     price: "$30",
//     rating: "5.0",
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqmpPsBgjKTaAjM2lIZmCwpq8Btu08ikIUFYEn10t3lbBDW5XXptI1XagpqekGMHrdrepn231KMr7XURqRqv1pAlddDByhIf7kXCPF3KppWA-ZECN9fFpJ0QRegyz_D5ugrNssOWcteq2wB9PME52N4vzkQYPycxY7dL_b_Pdm7SZ7k5I5WDjHai6Ub1vmkxfUurNefgdAjFQwvwg9NqUHDXaT0-bbg1Sb4coL-xgdTHUawNEUoUAO4RdP5bGWG5ztc93v3lgTTFja",
//   },
//   {
//     name: "Emily L.",
//     title: "Special Needs Educator • 4y exp",
//     price: "$28",
//     rating: "4.8",
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHm2p1VhORkPBRaKSmO-3tQAwjeSNfxATu90u-lb9EE5Pjfz3VfuEdgNmyB8RGAVzdPAH6FBOxME7w6pvcqDdzHugI6bsI8fVJ-YC70r94nG7IMeKYv1DME7oaudollBwAcfQsvLmezdw-HJZN4xNQLrK_BQAWEcPAnRP5GmCGp8qWsHdmJTLlh-vcTSF2ecoeDphedvEGYImS-WSDhM8bACNKhQHiOPJmTDO1vAKnKIDKL4BMsYDApEovJM46xrohUn8a3s9wy1Kl",
//   },
//   {
//     name: "Michael K.",
//     title: "Senior Living Specialist • 10y exp",
//     price: "$35",
//     rating: "4.9",
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpN5PzllfGTe8JjnSgVj2C72nX4U2NXMQItDHUlDkTmdNk1EfTV38Je5EL8iQygHppvSubq_WbBUPcQppYzOaUbtXQ_YwvOcU2yRojGYhRxR5N07q6l_zo4sdEAKTEnJHy42eTpI8ghj_EhYLnzS6BnHiGtXm1Y08OIphE0oAsShMe5neAGkz_yF7mUCRURVYMYtKyqd90qA8D_pOohEgTu7bwLbY08SBRazlSPbyTQ_BIyZ7HkpA0GvuBhQVR5NxDAtdytUYLc2Ht",
//   },
// ];

const Caretakers = async () => {
  const { results: caretakers } = await getCaretakers();
  return (
          <section className="py-20 px-4">
            <div className="mx-auto max-w-7xl">
              <div className="mb-12 flex flex-col sm:flex-row items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">Featured Caretakers</h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">Available caretakers with the highest community ratings.</p>
                </div>
                <button className="text-sm font-bold text-primary flex items-center gap-1">
                  View All Caregivers <MdArrowForward className="text-sm" />
                </button>
              </div>
    
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {caretakers.map((caretaker, index) => (
                  <ServicesCard key={index} caretaker={caretaker} />
                ))}
              </div>
            </div>
          </section>
  );
};

export default Caretakers;